import Layout from "@/components/Layout";
import Title from "@/components/Title";
import useSWR from "swr";
import { IVok } from "@/interfaces/Vok";

export default function Home() {
  const { data, error } = useSWR("/api/voks");
  console.log(data, error);

  if (error) return <Layout>Es gab ein Fehler</Layout>;
  if (!data) return <Layout>Lädt ...</Layout>;
  return (
    <Layout>
      <Title>Vokabelliste</Title>
      {data.map((vok: IVok) => {
        return (
          <>
            <div>{vok.deutsch}</div>
            <div>{vok.koreanisch}</div>
          </>
        );
      })}
    </Layout>
  );
}
