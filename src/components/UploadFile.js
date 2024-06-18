import axios from "axios";
import { useDropzone } from "react-dropzone";

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

function Basic(props) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
      <button onClick={() => uploadFile(acceptedFiles)}>Upload</button>
    </section>
  );
}
