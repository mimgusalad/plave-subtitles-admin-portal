import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../css/drop-file.css";

export default function FileSelect({ fetchData }) {
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
    for (let i = 0; i < files.length; i++) formData.append("file", files[i]);

    try {
      const res = await axios.post(
        "https://api.plave-subtitles.com/file",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFiles([]);
      alert("Successfully uploaded files");
      fetchData();
    } catch (err) {
      console.log(err);
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
