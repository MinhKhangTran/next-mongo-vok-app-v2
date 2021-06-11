import Layout from "@/components/Layout";
import useSWR from "swr";
import { IPaginateVok, IVok } from "@/interfaces/Vok";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0";
import Card from "@/components/Card";
import { resPerPage } from "../config";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();
  const { page } = router.query;
  // console.log(page);

  const { data, error } = useSWR(
    page ? `/api/voks/?page=${page}` : `/api/voks/?page=1`
  ) as {
    data: IPaginateVok;
    error: any;
  };

  //total pages, lastpage, prev page, nextpage
  const totalPages = Math.ceil(data?.vokCount / resPerPage);
  const firstPage = Number(page) === 1;
  const lastPage = Number(page) === totalPages;
  const prevPage = `/?page=${Number(page) - 1}`;
  const nextPage = `/?page=${Number(page) + 1}`;
  // console.log(totalPages, firstPage, lastPage, prevPage, nextPage);

  //handle pagination
  const handlePagination = (page: number) => {
    router.push(`/?page=${page}`);
  };

  useEffect(() => {
    router.push("/?page=1");
  }, []);

  if (error) return <Layout>Es gab ein Fehler</Layout>;
  if (!data) return <Layout>Lädt ...</Layout>;

  if (user && data.vokCount === 0) {
    return <Layout>Es gibt noch keine Vokabeln</Layout>;
  }
  if (user) {
    return (
      <Layout>
        <StyledGrid>
          {data.vokCount > 0 &&
            data.voks.map((vok: IVok) => {
              return (
                <Card
                  key={vok._id}
                  koreanisch={vok.koreanisch}
                  deutsch={vok.deutsch}
                  _id={vok._id}
                  favorite={vok.favorite}
                />
              );
            })}
        </StyledGrid>
        {totalPages > 1 && (
          <StyledPagination>
            {!firstPage && (
              <button
                onClick={() => {
                  router.push(prevPage);
                }}
              >
                ◀️
              </button>
            )}

            {Array.from({ length: totalPages }, (_, index) => {
              return (
                <>
                  <button
                    //@ts-expect-error
                    className={page == index + 1 ? "active" : ""}
                    onClick={() => {
                      handlePagination(index + 1);
                      // console.log({ page: page, number: index + 1 });
                    }}
                    key={index + 1}
                  >
                    {index + 1}
                  </button>
                </>
              );
            })}
            {!lastPage && (
              <button
                onClick={() => {
                  router.push(nextPage);
                }}
              >
                ▶️
              </button>
            )}
          </StyledPagination>
        )}
      </Layout>
    );
  }
  return <Layout>Willkommen um neue Vokabeln einzufügen bitte anmelden</Layout>;
}
const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 0rem;
  }
`;

const StyledPagination = styled.section`
  margin-left: 0.75rem;
  button {
    padding: 0.5rem;
    border-radius: 4px;
    border: none;
    font-size: 1.5rem;
    width: 50px;
    height: 50px;

    margin: 2rem 0.25rem;

    transition: all 0.5s;
    cursor: pointer;

    background-color: var(--primary-300);
    color: var(--primary-100);
    &:hover {
      background-color: var(--primary-400);
      color: var(--primary-50);
    }
  }
  .active {
    background-color: var(--primary-400);
    color: var(--primary-50);
  }
`;

// export const getServerSideProps = withPageAuthRequired();
