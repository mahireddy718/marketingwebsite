import { useState } from "react";
import { API } from "./api.jsx";
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function BulkUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".csv")) {
      setFile(selectedFile);
    } else {
      toast.error("Please select a valid .csv file");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.endsWith(".csv")) {
        setFile(droppedFile);
      } else {
        toast.error("Please drop a valid .csv file");
      }
    }
  };

  const uploadCSV = async () => {
    if (!file) {
      toast.error("Please select a CSV file first");
      return;
    }
    
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/admin/bulk-upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success(`Successfully uploaded ${res.data.total || 0} products!`);
      setFile(null);
    } catch (err) {
      console.error("Bulk upload error:", err);
      toast.error(err.response?.data?.msg || "Failed to upload CSV");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Bulk Product Upload</h2>
        <p className="text-gray-500 mt-2">Upload multiple products at once using a CSV file.</p>
      </div>

      <div className="bg-white rounded-3xl border-2 border-dashed border-gray-200 p-12 transition-all hover:border-pink-300">
        <div 
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center space-y-4 ${dragActive ? 'scale-105 opacity-70' : ''}`}
        >
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center text-pink-500">
            <UploadCloud size={40} />
          </div>
          
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-800">
              {file ? file.name : "Drag and drop your CSV file here"}
            </p>
            <p className="text-gray-500 mt-1 text-sm">
              {file ? `${(file.size / 1024).toFixed(2)} KB` : "or click to browse from your computer"}
            </p>
          </div>

          <label className="relative cursor-pointer">
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all inline-block">
              {file ? "Change File" : "Choose File"}
            </span>
          </label>

          {file && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={uploadCSV}
              disabled={uploading}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-orange-500 text-white px-10 py-4 rounded-2xl font-bold shadow-lg shadow-pink-200 hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Uploading...
                </>
              ) : (
                <>
                  <CheckCircle size={20} />
                  Start Bulk Upload
                </>
              )}
            </motion.button>
          )}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-4">
            <FileText size={20} />
          </div>
          <h4 className="font-bold text-gray-900">CSV Template</h4>
          <p className="text-sm text-gray-500 mt-2">Download our official CSV template to ensure your data is formatted correctly.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-green-50 text-green-500 rounded-lg flex items-center justify-center mb-4">
            <CheckCircle size={20} />
          </div>
          <h4 className="font-bold text-gray-900">Validation</h4>
          <p className="text-sm text-gray-500 mt-2">We automatically validate prices, stock levels, and required fields before saving.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-lg flex items-center justify-center mb-4">
            <AlertCircle size={20} />
          </div>
          <h4 className="font-bold text-gray-900">Image Support</h4>
          <p className="text-sm text-gray-500 mt-2">Use public image URLs in your CSV, or upload images later in the product editor.</p>
        </div>
      </div>
    </div>
  );
}

export default BulkUpload;
