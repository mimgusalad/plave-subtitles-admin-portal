import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Avatar } from "@mui/material";
import "../css/profile.css";
function Profile() {
  return (
    <div className="profile">
      <Avatar
        alt="John Doe"
        src="https://www.w3schools.com/howto/img_avatar.png"
      />
      <span>John Doe</span>
      <PlayArrowIcon
        style={{
          rotate: "90deg",
          color: "white",
          width: "15px",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default Profile;
