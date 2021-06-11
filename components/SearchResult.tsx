import { IVok } from "@/interfaces/Vok";
import Link from "next/link";
import styled from "styled-components";

const SearchResult = ({ results }: { results: IVok[] }) => {
  // console.log(results);

  if (results.length === 0) return <></>;
  return (
    <StyledSearchResult>
      <h6>Ergebnisse:</h6>
      {results.map((result) => {
        return (
          <div>
            <Link href={`/v/${result._id}`}>
              <div className="result-bar">
                <p>{result.deutsch}</p>
                <p className="koreanisch">{result.koreanisch}</p>
              </div>
            </Link>
          </div>
        );
      })}
    </StyledSearchResult>
  );
};

const StyledSearchResult = styled.div`
  position: absolute;
  display: inline;
  background: white;
  top: 36px;
  left: 0;
  z-index: 1;
  /* transition: all 2s; */

  width: 100%;
  h6 {
    padding: 5px 10px;
  }

  border: 2px solid var(--primary-400);
  color: var(--primary-400);
  font-size: 1.15rem;
  .result-bar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    transition: all 0.2s;
    cursor: pointer;
    p {
      margin-bottom: 0;
    }
    &:hover {
      background: var(--primary-50);
    }
  }
`;

export default SearchResult;
