import axios from "axios";
import { useEffect, useState } from "react";
import { NEXT_URL } from "../config";
import { StyledInput } from "./Input";
import SearchResult from "./SearchResult";
import { useRouter } from "next/router";

const Search = () => {
  const [searchData, setSearchData] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const router = useRouter();
  const { page } = router.query;

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
          `${NEXT_URL}/api/voks?page=${page}&vok=${searchData}`
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
      <SearchResult
        //@ts-expect-error
        results={searchResult}
      />
    </section>
  );
};

export default Search;
