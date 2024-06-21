import axios from "axios";
import { useEffect, useState } from "react";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import "../css/feedback.css";

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const res = await axios.get("http://localhost:8080/feedback");
        console.log(res.data);
        setFeedback(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFeedback();
  }, []);

  return (
    <div>
      <Sidebar />
      <Profile />
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
