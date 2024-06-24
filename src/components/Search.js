import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import "../css/search.css";

export default function Search({ handleSearch }) {
  const [keyword, setKeyword] = useState("");

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search"
        value={keyword}
        onChange={(e) => {
          handleSearch(e.target.value);
          setKeyword(e.target.value);
        }}
      />
      <button onClick={() => console.log("search for", keyword)}>
        <SearchIcon className="search-icon" />
      </button>
    </div>
  );
}
