import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/profile.css";

export default function Profile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    image: "/default-avatar.png",
  });

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:8080/user");
        const userData = res.data;
        const imageBlob = new Blob([new Uint8Array(user.image)], {
          type: "image/png",
        });
        const imageUrl = URL.createObjectURL(imageBlob);

        setUser({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          image: `data:image/png;base64,${res.data.image}`,
        });
      } catch (error) {
        console.error(error);
      }
    };
    getUser();
  }, []);

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
