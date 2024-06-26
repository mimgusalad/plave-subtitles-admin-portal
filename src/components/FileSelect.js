import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "../css/drop-file.css";

export default function FileSelect({ fetchSubtitle }) {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) =>
      setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]),
  });

  const handleCloseIconClick = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const uploadFile = async (files) => {
    setIsUploading(true);
    const formData = new FormData();
    const idArray = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const [yymmdd, lang] = file.name.split("_");
      const videoId = await fetchVideoId(yymmdd);
      idArray.push(videoId);
      formData.append("file", file, `${videoId}_${lang}`);
    }

    try {
      await axios.post("http://localhost:8080/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });
      setFiles([]);
      setIsUploading(false);
      setUploadProgress(0);
      alert("Successfully uploaded files");

      for (let i = 0; i < files.length; i++) {
        const id = await fetchVideoId(files[i].name.split("_")[0]);
        fetchSubtitle(id);
      }

      try {
        await axios.post("http://localhost:8080/file/subtitle", idArray);
      } catch (err) {
        console.error("Error uploading subtitle:", err);
      }
    } catch (err) {
      console.log(err);
      setIsUploading(false);
      setUploadProgress(0);
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
        <button
          onClick={() => uploadFile(files)}
          disabled={files.length === 0 || isUploading}
        >
          {isUploading ? (
            <>
              Uploading Files{" "}
              <LinearProgress variant="determinate" value={uploadProgress} />
            </>
          ) : (
            "Upload Files"
          )}
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
