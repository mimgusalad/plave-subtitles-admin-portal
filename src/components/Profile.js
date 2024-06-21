import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Avatar } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/profile.css";

export default function Profile({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="profile">
      <Avatar alt="John Doe" src={user.image} />
      <div className="profile-name" onClick={handleMenuOpen}>
        <span>{user.username}</span>
        <PlayArrowIcon
          style={{
            rotate: "90deg",
            width: "15px",
            cursor: "pointer",
          }}
        />
      </div>
      {isMenuOpen && <Menu handleMenuOpen={handleMenuOpen} />}
    </div>
  );
}

const Menu = ({ handleMenuOpen }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/settings");
    handleMenuOpen();
  };

  return (
    <div className="menu">
      <ul>
        <li onClick={handleNavigate}>Settings</li>
        <li>Logout</li>
      </ul>
    </div>
  );
};
