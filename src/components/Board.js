import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import "../css/board.css";

export default function Board({ data, fetchData }) {
  const handleDelete = async (langCode, videoId) => {
    const action = window.confirm(
      "delete this subtitle? " + videoId + " " + langCode
    );
    if (action) {
      try {
        const res = await axios.delete("https://api.plave-subtitles.com/file", {
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

  return (
    <div className="board">
      <h2>Overview</h2>
      <div className="board header">
        <div className="date-column">
          <span>Uploaded Date</span>
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
          <span>Available Subs</span>
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
              {item.subtitles.length > 0 ? (
                item.subtitles.map((lang) => {
                  return (
                    <SubtitleChips
                      key={lang}
                      langCode={lang}
                      videoId={item.videoId}
                    />
                  );
                })
              ) : (
                <span>None</span>
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
    yejun: "royalblue",
    noah: "purple",
    bamby: "pink",
    eunho: "red",
    hamin: "black",
  };

  const ChipStyle = (member) => ({
    backgroundColor: memberColor[member],
  });

  const name = member.charAt(0).toUpperCase() + member.slice(1);

  return <span style={ChipStyle(member)}>{name}</span>;
};
