import styled from "styled-components";
import { FaTrash, FaEdit, FaHeart, FaRegHeart } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

import { mutate } from "swr";
import { NEXT_URL } from "@/config/index";

const Card = ({
  koreanisch,
  deutsch,
  _id,
  favorite,
}: {
  koreanisch?: string;
  deutsch?: string;
  _id?: string;
  favorite?: boolean;
}) => {
  // console.log(favorite);

  const deleteVok = async (_id: string) => {
    try {
      const { data } = await axios.delete(`${NEXT_URL}/api/voks/${_id}`);
      //   console.log(data);
      if (data) {
        mutate("/api/voks");
        mutate("/api/favorite");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const toggleFavorite = async (_id: string) => {
    try {
      const { data } = await axios.put(`${NEXT_URL}/api/voks/favorite/${_id}`);
      //   console.log(data);
      if (data) {
        mutate("/api/voks");
        mutate("/api/favorite");
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
        <button
          onClick={() => {
            toggleFavorite(_id!);
          }}
          className="herz"
        >
          {/* <FaHeart /> */}
          {favorite ? <FaHeart /> : <FaRegHeart />}
        </button>
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
  display: flex;
  height: 50%;
  .edit {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    border: none;
    font-size: 1rem;
    margin-top: 1rem;
    margin-left: 1rem;
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
    padding: 0.125rem 0.25rem;
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
  .herz {
    padding: 0.25rem;
    border-radius: 4px;
    border: none;
    font-size: 1.5rem;
    margin-top: 1rem;

    transition: all 0.5s;
    cursor: pointer;

    background-color: var(--red-light);
    color: var(--red-dark);
    &:hover {
      box-shadow: var(--shadow-4);
    }
  }
  @media (max-width: 768px) {
    height: 75%;
  }
`;

export default Card;
