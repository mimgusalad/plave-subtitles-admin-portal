import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";
import Setting from "./pages/Setting";

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLogin, setIsLogin] = useState(
    sessionStorage.getItem("isLogin") || false
  );
  const [user, setUser] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8080/dashboard");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = (userData) => {
    setUser({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      image: `data:image/png;base64,${userData.image}`,
    });
    setIsLogin(true);
    sessionStorage.setItem("isLogin", true);
  };

  const handleLogout = () => {
    setIsLogin(false);
    sessionStorage.removeItem("isLogin");
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      {!isLogin ? (
        <Login setIsLogin={setIsLogin} handleLogin={handleLogin} />
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                data={data}
                fetchData={fetchData}
                user={user}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                data={data}
                fetchData={fetchData}
                user={user}
                handleLogout={handleLogout}
              />
            }
          />
          <Route
            path="/settings"
            element={<Setting user={user} setUser={setUser} />}
          />
          <Route
            path="/feedback"
            element={<Feedback user={user} handleLogout={handleLogout} />}
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
