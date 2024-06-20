import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/profile.css";

export default function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    console.log(isMenuOpen);
  }, [isMenuOpen]);

  return (
    <div className="profile">
      <Avatar
        alt="John Doe"
        src="https://www.w3schools.com/howto/img_avatar.png"
      />
      <div className="profile-name" onClick={handleMenuOpen}>
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
