import axios from "axios";
import { useEffect, useState } from "react";
import "../css/board.css";

export default function Board() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/dashboard");
        setData(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="board">
      <h2>Overview</h2>
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
            <div className="members-column">
              {item.members.map((member) => (
                <Chips key={member} data={member} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Chips = ({ data: member }) => {
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
