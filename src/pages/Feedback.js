import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
import Profile from "../components/Profile";
import Sidebar from "../components/Sidebar";
import "../css/feedback.css";

export default function Feedback({
  user,
  handleLogout,
  fetchFeedback,
  feedback,
  setFeedback,
}) {
  const handleDelete = async (row) => {
    const scriptUrl =
      "https://script.google.com/macros/s/AKfycbwKn88K0kNRaEB_u2KGJSKWMHn1RRvRMp8m209pnwRBb0aMQ_Jxgvd13OK0ww7NZP_QjA/exec";
    setFeedback(feedback.filter((item) => item !== row));
    try {
      fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify({
          action: "delete",
          ...row,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const interval = setInterval(fetchFeedback, 60000); // Fetch new feedback every 60 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <Sidebar page={"Feedback"} />
      <div className="feedback-header">
        <div className="feedback-container">
          <h2>Feedback</h2>
          <Profile user={user} handleLogout={handleLogout} />
        </div>
        <div className="feedback-column-header">
          <div className="timestamp-column">
            <span>Timestamp</span>
          </div>
          <div className="videoId-column">
            <span>Video ID</span>
          </div>
          <div className="date-column">
            <span>Streamed On</span>
          </div>
          <div className="title-column">
            <span>Title</span>
          </div>
          <div className="timecode-column">
            <span>Timecode</span>
          </div>
          <div className="message-column">
            <span>Message</span>
          </div>
        </div>
      </div>
      <FeedbackResponse feedback={feedback} handleDelete={handleDelete} />
    </div>
  );
}

const FeedbackResponse = ({ feedback, handleDelete }) => {
  const iconStyle = {
    color: "#dd2e44",
    cursor: "pointer",
    padding: "5px",
    marginLeft: "10px",
  };

  return (
    <div className="feedbacks">
      <div className="cards">
        {feedback.map((item, index) => (
          <div key={index} className="feedback">
            <CloseIcon style={iconStyle} onClick={() => handleDelete(item)} />
            <div className="timestamp-column">
              <span>{item.timestamp}</span>
            </div>
            <div className="videoId-column">
              <span>{item.videoId}</span>
            </div>
            <div className="date-column">
              <span>{item.streamDate}</span>
            </div>
            <div className="title-column">
              <span>{item.title}</span>
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
};
