import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

import { mutate } from "swr";

const Card = ({
  koreanisch,
  deutsch,
  _id,
}: {
  koreanisch?: string;
  deutsch?: string;
  _id?: string;
}) => {
  const deleteVok = async (_id: string) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/api/voks/${_id}`
      );
      //   console.log(data);
      if (data) {
        mutate("/api/voks");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <StyledCard>
        <div>
          <h4>Koreanisch</h4>
          <p>{koreanisch}</p>
        </div>
        <div>
          <h4>Deutsch</h4>
          <p>{deutsch}</p>
        </div>
      </StyledCard>
      <StyledButtonGroup>
        <Link href={`/v/${_id}`}>
          <button className="edit">
            <FaEdit /> Ändern
          </button>
        </Link>
        <button
          onClick={() => {
            deleteVok(_id!);
          }}
          className="löschen"
        >
          <FaTrash /> Löschen
        </button>
      </StyledButtonGroup>
    </>
  );
};
const StyledCard = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 0rem auto;
  background: var(--primary-300);
  color: var(--primary-700);
  padding: 0.5rem 2rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  position: relative;
  h4 {
    margin-bottom: 1rem;
  }
  p {
    text-transform: capitalize;
    font-size: 1.25rem;
    margin: 0;
    color: var(--primary-50);
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1.25rem;
    }
    p {
      font-size: 1.15rem;
    }
  }
`;

const StyledButtonGroup = styled.div`
  width: 90%;
  max-width: 500px;
  margin: 0rem auto 1rem;
  .edit {
    padding: 0.25rem 1.25rem;
    border-radius: 4px;
    border: none;
    font-size: 1rem;
    margin-top: 1rem;

    color: var(--green-light);
    transition: all 0.5s;
    cursor: pointer;
    background: var(--green-dark);
    &:hover {
      background-color: var(--green-light);
      color: var(--green-dark);
    }
  }
  .löschen {
    padding: 0.25rem 1.25rem;
    border-radius: 4px;
    border: none;
    font-size: 1rem;
    margin-top: 1rem;
    margin-left: 1rem;
    box-shadow: inset 0px 0px 0px 3px var(--red-dark);
    color: var(--red-dark);
    transition: all 0.5s;
    cursor: pointer;
    background: transparent;
    &:hover {
      background-color: var(--red-dark);
      color: var(--red-light);
    }
  }
`;

export default Card;
