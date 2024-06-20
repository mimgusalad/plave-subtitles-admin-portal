import { Avatar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/setting.css";

export default function Setting() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [content, setContent] = useState({
    image: null,
    userId: null,
  });
  const userId = "mimgusalad";

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = async () => {
    if (selectedImage) {
      const formData = new FormData();
      setContent({ ...content, image: selectedImage, userId: userId });

      formData.append("file", JSON.stringify(content));

      try {
        const res = await axios.post(
          "http://localhost:8080/profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 200)
          alert("Profile image updated successfully"); // 토스트 메세지?
        else alert("Failed to update profile image");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Sidebar />
      <div className="setting">
        <h1 id="setting-header">Profile Setting</h1>
        <div className="setting-container">
          <Avatar
            className="avatar"
            alt="profile image"
            src={previewUrl || "/default-avatar.png"}
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <div id="setting-profile">
            <h1>이경민</h1>
            <span>{userId}@gmail.com</span>
          </div>
          <button id="setting-button" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
}
