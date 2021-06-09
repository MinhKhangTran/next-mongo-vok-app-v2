import styled from "styled-components";
import Link from "next/link";

const vok = {
  koreanisch: "bla",
  deutsch: "bla",
  updatedAt: "mep",
  _id: "111",
};
const Table = () => {
  return (
    <StyledTable>
      <tr>
        <th>Koreanisch</th>
        <th>Deutsch</th>
        <th>Datum</th>
      </tr>

      <Link href={`/v/${vok._id}`}>
        <tr key={vok._id}>
          <td>{vok.koreanisch}</td>
          <td>{vok.deutsch}</td>
          <td>{new Date(vok.updatedAt).toLocaleDateString("de-DE")}</td>
        </tr>
      </Link>
    </StyledTable>
  );
};

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

export default Table;
