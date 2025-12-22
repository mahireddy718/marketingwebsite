import { useState } from "react";
import axios from "axios";

function BulkUpload() {
  const [file, setFile] = useState(null);

  const uploadCSV = async () => {
    console.log("Upload function fired");

    if (!file) return alert("Select a CSV file");
    


    const formData = new FormData();
    formData.append("file", file);

    // const res = await axios.post(
    //   "http://localhost:5002/products/bulk-upload",
    //   formData,
    //   { headers: { "Content-Type": "multipart/form-data" } }
    // );
    console.log("Calling:", "http://localhost:5002/products/bulk-upload");

    const res = await axios.post(
  "http://localhost:3000/products/bulk-upload",
  formData,
  { headers: { "Content-Type": "multipart/form-data" } }
);


    alert("Uploaded " + res.data.total + " products");
  };
  

  return (
    <div style={{ padding: 20 }}>
      <h2>Bulk Product Upload</h2>
      
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadCSV} style={{ marginLeft: 10 }}>
        Upload
      </button>
    </div>
  );
}

export default BulkUpload;
