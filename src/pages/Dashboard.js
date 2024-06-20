import { useNavigate } from "react-router-dom";
import Board from "../components/Board";
import Basic from "../components/FileSelect";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const nav = useNavigate();
  return (
    <div>
      <Sidebar />
      <Board />
      <Profile />
      <Basic />
    </div>
  );
}
export default Dashboard;
