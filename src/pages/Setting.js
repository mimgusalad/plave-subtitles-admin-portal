import { Avatar } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../css/setting.css";

export default function Setting({ user, setUser }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

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

      formData.append("image", selectedImage);
      formData.append("id", user.id);

      try {
        const res = await axios.patch(
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
        getUser();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user");
      const userData = res.data;

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

  return (
    <>
      <Sidebar page="Dashboard" />
      <div className="setting">
        <h1 id="setting-header">Profile Setting</h1>
        <div className="setting-container">
          <Avatar
            className="avatar"
            alt="profile image"
            src={previewUrl || user.image}
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
            <h1>{user.username}</h1>
            <span>{user.email}</span>
          </div>
          <button id="setting-button" onClick={handleEditClick}>
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
}
