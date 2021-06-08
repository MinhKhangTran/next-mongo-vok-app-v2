import Layout from "@/components/Layout";
import Title from "@/components/Title";
import useSWR from "swr";
import { IVok } from "@/interfaces/Vok";
import styled from "styled-components";
import { useUser } from "@auth0/nextjs-auth0";
import { FaTrash, FaEdit } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const { data, error } = useSWR("/api/voks");
  // console.log(data, error);
  const { user } = useUser();
  console.log(user);

  if (error) return <Layout>Es gab ein Fehler</Layout>;
  if (!data) return <Layout>Lädt ...</Layout>;
  return (
    <Layout>
      <StyledTable>
        <tr>
          <th>Koreanisch</th>
          <th>Deutsch</th>
          <th>Datum</th>
        </tr>
        {data.map((vok: IVok) => {
          return (
            <Link href={`/v/${vok._id}`}>
              <tr key={vok._id}>
                <td>{vok.koreanisch}</td>
                <td>{vok.deutsch}</td>
                <td>{new Date(vok.updatedAt).toLocaleDateString("de-DE")}</td>
              </tr>
            </Link>
          );
        })}
      </StyledTable>
    </Layout>
  );
}

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
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
  .settings {
    display: flex;
    justify-content: space-between;
  }
`;
