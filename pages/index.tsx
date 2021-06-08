import Layout from "@/components/Layout";
import Title from "@/components/Title";
import useSWR from "swr";
import { IVok } from "@/interfaces/Vok";
import styled from "styled-components";

export default function Home() {
  const { data, error } = useSWR("/api/voks");
  console.log(data, error);

  if (error) return <Layout>Es gab ein Fehler</Layout>;
  if (!data) return <Layout>Lädt ...</Layout>;
  return (
    <Layout>
      <Title>Vokabelliste</Title>
      <StyledTable>
        <tr>
          <th>Koreanisch</th>
          <th>Deutsch</th>
          <th>Datum</th>
          <th>User</th>
        </tr>
        {data.map((vok: IVok) => {
          return (
            <tr key={vok._id}>
              <td>{vok.koreanisch}</td>
              <td>{vok.deutsch}</td>
              <td>{new Date(vok.updatedAt).toLocaleDateString("de-DE")}</td>
              <td>MKT</td>
            </tr>
          );
        })}
      </StyledTable>
    </Layout>
  );
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid var(--primary-700);
    padding: 0.5rem;
  }
  tr {
    transition: all 0.5s;
  }
  th {
    background: var(--primary-400);
    color: var(--primary-50);
    text-align: left;
  }
  td {
    text-transform: capitalize;
  }
  tr:nth-child(even) {
    background: var(--primary-100);
  }
  tr:hover {
    background: var(--primary-200);
  }
`;
