import { IVok } from "@/interfaces/Vok";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { NEXT_URL } from "../config";
import { StyledInput } from "./Input";
import SearchResult from "./SearchResult";

const Search = () => {
  const [searchData, setSearchData] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //useeffect with searchData as dependency.
  //Every time User tapped on the search bar, we make a get
  //request to the /api/voks?vok=${searchData} and
  //put the result to the array

  useEffect(() => {
    const getResults = async () => {
      if (searchData === "") {
        setSearchResult([]);
      } else {
        const { data } = await axios.get(
          `${NEXT_URL}/api/voks?vok=${searchData}`
        );
        setSearchResult(data);
      }
    };
    getResults();
  }, [searchData]);

  return (
    <section style={{ position: "relative" }}>
      <StyledInput
        eckig
        placeholder="Suche..."
        value={searchData}
        onChange={(e) => {
          setSearchData(e.target.value);
        }}
      ></StyledInput>
      <SearchResult results={searchResult} />
    </section>
  );
};

export default Search;
