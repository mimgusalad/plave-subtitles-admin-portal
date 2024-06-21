import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../css/drop-file.css";

const uploadFile = async (file) => {
  const formData = new FormData();
  for (let i = 0; i < file.length; i++) formData.append("file", file[i]);

  try {
    const res = await axios.post("http://localhost:8080/api/files", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // const res = await axios.get(
    //   "http://localhost:8080/api/files?filename=meatball.png"
    // );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
};

export default function Basic(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) =>
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]),
  });

  const handleCloseIconClick = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
        <button
          onClick={() => uploadFile(fileList)}
          disabled={files.length === 0}
        >
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
