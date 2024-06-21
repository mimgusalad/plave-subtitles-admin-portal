import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";
import Setting from "./pages/Setting";

function App() {
  const [data, setData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {!isLogin ? (
        <Login setIsLogin={setIsLogin} setUser={setUser} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard data={data} fetchData={fetchData} user={user} />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard data={data} fetchData={fetchData} user={user} />
            }
          />
          <Route
            path="/settings"
            element={<Setting user={user} setUser={setUser} />}
          />
          <Route path="/feedback" element={<Feedback user={user} />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
