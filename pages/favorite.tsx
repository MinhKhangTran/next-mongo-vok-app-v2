import Layout from "@/components/Layout";
import useSWR from "swr";
import { IPaginateVok, IVok } from "@/interfaces/Vok";
import { useUser } from "@auth0/nextjs-auth0";
import Card from "@/components/Card";
import { resPerPage } from "../config";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { StyledGrid, StyledPagination } from "pages";
import Link from "next/link";

export default function Favorite() {
  const { user } = useUser();
  const router = useRouter();
  const { page } = router.query;
  const { data, error } = useSWR(
    page ? `/api/voks/favorite/?page=${page}` : `/api/voks/favorite/?page=1`
  ) as {
    data: IPaginateVok;
    error: any;
  };

  //total pages, lastpage, prev page, nextpage
  const totalPages = Math.ceil(data?.vokCount / resPerPage);
  const firstPage = Number(page) === 1;
  const lastPage = Number(page) === totalPages;
  const prevPage = `/favorite/?page=${Number(page) - 1}`;
  const nextPage = `/favorite/?page=${Number(page) + 1}`;
  // console.log(totalPages, firstPage, lastPage, prevPage, nextPage);

  //handle pagination
  const handlePagination = (page: number) => {
    router.push(`/favorite/?page=${page}`);
  };

  useEffect(() => {
    router.push("/favorite/?page=1");
  }, []);

  if (error)
    return <Layout title="VokApp | Favoriten">Es gab ein Fehler</Layout>;
  if (!data) return <Layout title="VokApp | Favoriten">Lädt ...</Layout>;

  if (user && data.vokCount === 0) {
    return (
      <Layout title="VokApp | Favoriten">
        Du hast noch keine Favoriten. <Link href="/">Hier klicken</Link> um
        zurück zugehen
      </Layout>
    );
  }
  if (user) {
    return (
      <Layout title="VokApp | Favoriten">
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
