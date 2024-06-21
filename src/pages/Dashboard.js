import Board from "../components/Board";
import FileSelect from "../components/FileSelect";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";

function Dashboard({ data, fetchData, user }) {
  return (
    <div>
      <Sidebar page={"Dashboard"} />
      <Board data={data} fetchData={fetchData} />
      <Profile user={user} />
      <FileSelect fetchData={fetchData} />
    </div>
  );
}
export default Dashboard;
