import SearchIcon from "@mui/icons-material/Search";
import "../css/search.css";

export default function Search({ handleSearch }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by keyword..."
        onChange={(e) => {
          handleSearch(e.target.value);
          console.log(e.target.value);
        }}
      />
      <button>
        <SearchIcon className="search-icon" />
      </button>
    </div>
  );
}
