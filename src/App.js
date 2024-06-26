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
  const [feedback, setFeedback] = useState([]);
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLogin") === "true"
  );
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  const fetchFeedback = async () => {
    try {
      const res = await axios.get("https://api.plave-subtitles.com/feedback");
      const result = res.data.map((item) => {
        const streamDate = data.find(
          (stream) => stream.videoId === item.videoId
        ).date;
        const title = data.find(
          (stream) => stream.videoId === item.videoId
        ).title;
        return {
          timestamp: item.timestamp,
          videoId: item.videoId,
          streamDate: streamDate,
          title: title,
          timecode: item.timecode,
          message: item.message,
        };
      });
      setFeedback(result);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbwhoo5Z0heiD3zW6pc3bLqjnt2NLPaPPEDCdX_YSfxwuyS4uW5yOYH3O2g1QDBYyX3m6A/exec";
    try {
      const [dataRes, feedbackRes] = await Promise.all([
        axios.get(scriptUrl, {
          params: {
            sheetName: "Database",
          },
        }),
        axios.get("https://api.plave-subtitles.com/feedback"),
      ]);

      const rawData = dataRes.data;
      const data = rawData.map((item) => ({
        date: item[0].split("T")[0],
        videoId: item[1],
        title: item[2],
        members: item[3].split(","),
      }));

      const feedbackData = feedbackRes.data.map((item) => {
        const stream = data.find((stream) => stream.videoId === item.videoId);
        return {
          timestamp: item.timestamp,
          videoId: item.videoId,
          streamDate: stream?.date || "Unknown Date",
          title: stream?.title || "Unknown Title",
          timecode: item.timecode,
          message: item.message,
        };
      });

      setData(data);
      setFeedback(feedbackData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = (userData) => {
    const userObject = {
      id: userData.id,
      username: userData.username,
      email: userData.email,
      image: `data:image/png;base64,${userData.image}`,
    };
    setUser(userObject);
    setIsLogin(true);
    localStorage.setItem("isLogin", "true");
    localStorage.setItem("user", JSON.stringify(userObject));
  };

  const handleLogout = () => {
    setIsLogin(false);
    setUser({});
    localStorage.removeItem("isLogin");
    localStorage.removeItem("user");
    navigate("/");
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
            element={
              <Feedback
                data={data}
                user={user}
                handleLogout={handleLogout}
                fetchFeedback={fetchFeedback}
                feedback={feedback}
                setFeedback={setFeedback}
              />
            }
          />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      )}
    </div>
  );
}

export default App;
