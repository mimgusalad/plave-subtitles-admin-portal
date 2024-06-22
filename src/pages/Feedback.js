import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import "../css/feedback.css";

export default function Feedback({ user, handleLogout }) {
  const [feedback, setFeedback] = useState([]);
  const getFeedback = async () => {
    try {
      const res = await axios.get("https://api.plave-subtitles.com/feedback");
      setFeedback(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <div>
      <Sidebar page={"Feedback"} />
      <Profile user={user} handleLogout={handleLogout} />
      <div className="feedbacks">
        <h2>Feedback</h2>
        <div className="feedback header">
          <div className="timestamp-column">
            <span>Timestamp</span>
          </div>
          <div className="videoId-column">
            <span>Video ID</span>
          </div>
          <div className="timecode-column">
            <span>Timecode</span>
          </div>
          <div className="message-column">
            <span>Message</span>
          </div>
        </div>

        {feedback.map((item, index) => (
          <div key={index} className="feedback">
            <div className="timestamp-column">
              <span>{item.timestamp}</span>
            </div>
            <div className="videoId-column">
              <span>{item.videoId}</span>
            </div>
            <div className="timecode-column">
              <span>{item.timecode}</span>
            </div>
            <div className="message-column">
              <span>{item.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
