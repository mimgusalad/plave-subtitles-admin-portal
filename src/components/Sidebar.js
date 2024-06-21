import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/sidebar.css";

function Sidebar({ page }) {
  const navigate = useNavigate();
  const [isSelected, setIsSelected] = useState(page);

  const handleClick = (selected) => {
    setIsSelected(selected);
    navigate(`/${selected.toLowerCase()}`);
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li
          onClick={() => handleClick("Dashboard")}
          style={getStyle(isSelected === "Dashboard")}
        >
          Dashboard
        </li>
        <li
          onClick={() => handleClick("Feedback")}
          style={getStyle(isSelected === "Feedback")}
        >
          Feedback
        </li>
      </ul>
    </div>
  );
}

const getStyle = (isSelected) => ({
  padding: "10px 20px",
  textDecoration: "none",
  margin: "5px 0",
  width: "85%",
  cursor: "pointer",
  borderRadius: "10px",
  fontWeight: isSelected ? "bold" : "normal",
  backgroundColor: isSelected ? "snow" : "transparent",
  color: isSelected ? "royalblue" : "white",
  transition: "0.2s",
});

export default Sidebar;
