import Layout from "@/components/Layout";
// import Title from "@/components/Title";
import useSWR from "swr";
import { IVok } from "@/interfaces/Vok";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import Link from "next/link";
import Card from "@/components/Card";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0";

export default function Home() {
  const { data, error } = useSWR("/api/voks");
  // console.log(data, error);
  const { user } = useUser();
  // console.log(user);

  if (error) return <Layout>Es gab ein Fehler</Layout>;
  if (!data) return <Layout>Lädt ...</Layout>;

  if (user && data.length === 0) {
    return <Layout>Es gibt noch keine Vokabeln</Layout>;
  }
  if (user) {
    return (
      <Layout>
        <StyledGrid>
          {data.length > 0 &&
            data.map((vok: IVok) => {
              return (
                <Card
                  key={vok._id}
                  koreanisch={vok.koreanisch}
                  deutsch={vok.deutsch}
                  _id={vok._id}
                />
              );
            })}
        </StyledGrid>
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

// export const getServerSideProps = withPageAuthRequired();
