import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/board.css";

export default function Board({ data, fetchData }) {
  const [loading, setLoading] = useState({});
  const [subtitles, setSubtitles] = useState({});

  const handleDelete = async (langCode, videoId) => {
    const action = window.confirm(
      "delete this subtitle? " + videoId + " " + langCode
    );
    if (action) {
      try {
        await axios.delete("https://api.plave-subtitles.com/file", {
          params: { videoId, langCode },
        });
        fetchData();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const SubtitleChips = ({ langCode, videoId }) => {
    return (
      <span id="langCode-chip">
        {langCode.toUpperCase()}
        <CloseIcon
          className="lang-close-icon"
          onClick={() => handleDelete(langCode, videoId)}
        />
      </span>
    );
  };

  const fetchSubtitle = async (videoId) => {
    setLoading((prev) => ({ ...prev, [videoId]: true }));
    try {
      const res = await axios.get("http://localhost:8080/dashboard/subtitle", {
        params: { videoId },
      });
      setSubtitles((prev) => ({ ...prev, [videoId]: res.data }));
      setLoading((prev) => ({ ...prev, [videoId]: false }));
    } catch (err) {
      console.log(err);
      setLoading((prev) => ({ ...prev, [videoId]: false }));
    }
  };

  useEffect(() => {
    data.forEach((item) => {
      fetchSubtitle(item.videoId);
    });
  }, [data]);

  return (
    <div className="board">
      <h2>Overview</h2>
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

      <div className="cards">
        {data.map((item, index) => (
          <div key={index} className="card">
            <div className="date-column">
              <span>{item.date}</span>
            </div>
            <div className="videoId-column">
              <span>{item.videoId}</span>
            </div>
            <div className="title-column">
              <span>{item.title}</span>
            </div>
            <div className="members">
              {item.members.map((member) => (
                <MemberChips key={member} data={member} />
              ))}
            </div>
            <div className="subtitle">
              {loading[item.videoId] ? (
                <CircularProgress />
              ) : subtitles[item.videoId] &&
                subtitles[item.videoId].length > 0 ? (
                subtitles[item.videoId].map((lang) => (
                  <SubtitleChips
                    key={lang}
                    langCode={lang}
                    videoId={item.videoId}
                  />
                ))
              ) : (
                <span>Not yet</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const MemberChips = ({ data: member }) => {
  const memberColor = {
    yejun: "#5daded",
    noah: "#aa8ed6",
    bamby: "#f0b1c4",
    eunho: "#dd2e44",
    hamin: "#33cc99",
  };

  const ChipStyle = (member) => ({
    backgroundColor: memberColor[member],
  });

  const name = member.charAt(0).toUpperCase() + member.slice(1);

  return <span style={ChipStyle(member)}>{name}</span>;
};
