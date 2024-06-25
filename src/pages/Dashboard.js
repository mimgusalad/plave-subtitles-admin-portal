import { useState } from "react";
import Board from "../components/Board";
import FileSelect from "../components/FileSelect";
import Profile from "../components/Profile";
import Search from "../components/Search";
import Sidebar from "../components/Sidebar";
import "../css/dashboard.css";

function Dashboard({ data, fetchData, user, handleLogout }) {
  const [searchResults, setSearchResults] = useState(data);

  const handleSearch = (keyword) => {
    if (keyword === "") {
      setSearchResults(data);
    } else {
      const results = data.filter((item) => {
        return item.title.toLowerCase().includes(keyword.toLowerCase());
      });
      setSearchResults(results);
    }
  };

  return (
    <div>
      <Sidebar page={"Dashboard"} />
      <div className="dashboard-header">
        <div className="container">
          <h2>Overview</h2>
          <Search handleSearch={handleSearch} />
          <Profile user={user} handleLogout={handleLogout} />
        </div>
        <div className="board-header">
          <div className="date-column">
            <span>Live Stream Date</span>
          </div>
          <div className="videoId-column">
            <span>Video ID</span>
          </div>
          <div className="title-column">
            <span>Title</span>
          </div>
          <div className="members-column">
            <span>Members</span>
          </div>
          <div className="subtitle-column">
            <span>Done Subtitling</span>
          </div>
        </div>
      </div>
      <Board data={searchResults} fetchData={fetchData} />
      <FileSelect fetchData={fetchData} />
    </div>
  );
}
export default Dashboard;
