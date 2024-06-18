import axios from "axios";
import { useEffect, useState } from "react";
import Board from "../components/Board";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/dashboard");
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Sidebar />
      <Board />
      <Profile />
    </div>
  );
}
export default Dashboard;
