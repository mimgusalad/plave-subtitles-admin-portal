import { useState } from "react";
import "../css/sidebar.css";

function Sidebar() {
  const [isSelected, setIsSelected] = useState("Dashboard");

  const handleClick = (e) => {
    setIsSelected(e.target.innerText);
    console.log(e.target.innerText);
  };

  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li
          onClick={handleClick}
          style={style({ isSelected: isSelected === "Dashboard" })}
        >
          Dashboard
        </li>
        <li
          onClick={handleClick}
          style={style({ isSelected: isSelected === "Feedbacks" })}
        >
          Feedbacks
        </li>
      </ul>
    </div>
  );
}

const style = ({ isSelected }) => ({
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
