import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../css/drop-file.css";

export default function FileSelect({ fetchSubtitle }) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) =>
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]),
  });

  const handleCloseIconClick = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const uploadFile = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const [yymmdd, lang] = file.name.split("_");
      const videoId = await fetchVideoId(yymmdd);
      formData.append("file", file, `${videoId}_${lang}`);
    }

    try {
      await axios.post("http://localhost:8080/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setFiles([]);
      alert("Successfully uploaded files");
      for (let i = 0; i < files.length; i++) {
        const videoId = formData.get("file").name.split("_")[0];
        fetchSubtitle(videoId);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchVideoId = async (yymmdd) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/dashboard/search?keyword=${yymmdd}`
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching videoId:", err);
      return yymmdd;
    }
  };

  const fileList = files.map((file, index) => (
    <li key={file.path}>
      {file.path} - {formatFileSize(file.size)}
      <CloseIcon
        className="close-icon"
        onClick={() => handleCloseIconClick(index)}
        style={{ cursor: "pointer" }}
      />
    </li>
  ));

  return (
    <div className="drop-file-container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <i>
          <BackupIcon className="upload-icon" />
        </i>
        <span>Drag and drop files here or click to upload </span>
      </div>
      <div className="file-list">
        {files.length === 0 && (
          <>
            <span>YYMMDD_lang.srt</span>
            <span>VideoID_lang.srt</span>
          </>
        )}
        <ul>{fileList}</ul>
        <button onClick={() => uploadFile(files)} disabled={files.length === 0}>
          Upload Files
        </button>
      </div>
    </div>
  );
}

const formatFileSize = (size) => {
  if (size < 1024) return `${size} bytes`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  if (size < 1024 * 1024 * 1024)
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};
