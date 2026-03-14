import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Save, 
  Image as ImageIcon, 
  Tag, 
  Box, 
  Type,
  Link as LinkIcon
} from "lucide-react";
import { API } from "../api.jsx";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function ProductEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const res = await API.get(`/products/${id}`);
          setFormData(res.data);
        } catch (err) {
          toast.error("Failed to load product details");
        }
      };
      fetchProduct();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await API.put(`/api/admin/products/${id}`, formData);
        toast.success("Product updated successfully");
      } else {
        await API.post("/api/admin/products", formData);
        toast.success("Product added successfully");
      }
      navigate("/admin/products");
    } catch (err) {
      toast.error(isEdit ? "Failed to update product" : "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-white rounded-xl transition-all text-gray-400 group"
        >
          <ArrowLeft size={24} className="group-hover:text-gray-900" />
        </button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h2>
          <p className="text-gray-500">Fill in the details to {isEdit ? "update" : "create"} your product.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Form Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Type size={16} className="text-pink-500" />
                Product Name
              </label>
              <input 
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g. Matte Lipstick - Ruby Red"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Box size={16} className="text-pink-500" />
                Description
              </label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Describe your product features and benefits..."
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all outline-none resize-none"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <span className="text-pink-500 font-bold">₹</span>
                  Price
                </label>
                <input 
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  placeholder="299"
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Tag size={16} className="text-pink-500" />
                  Category
                </label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="makeup">Makeup</option>
                  <option value="skin">Skin</option>
                  <option value="hair">Hair</option>
                  <option value="fragrance">Fragrance</option>
                  <option value="men">Men</option>
                  <option value="bath-body">Bath & Body</option>
                  <option value="wellness">Wellness</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-pink-500 font-bold">B</span>
                Brand
              </label>
              <input 
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. L'Oreal"
                className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Image & Actions */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <ImageIcon size={16} className="text-pink-500" />
                Product Image URL
              </label>
              <div className="relative">
                <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-pink-500 transition-all outline-none text-xs"
                />
              </div>
            </div>

            {formData.image && (
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-gray-100 bg-gray-50">
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://placehold.co/400x400?text=Invalid+Image"; }}
                />
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                   <p className="text-xs text-white font-bold bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">Image Preview</p>
                </div>
              </div>
            )}

            {!formData.image && (
              <div className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 text-gray-400">
                <ImageIcon size={48} strokeWidth={1} />
                <p className="text-xs font-medium px-4 text-center">Paste an image URL above to see a preview</p>
              </div>
            )}
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Save size={20} />
            )}
            {isEdit ? "Update Product" : "Save Product"}
          </button>

          <button 
            type="button"
            onClick={() => navigate("/admin/products")}
            className="w-full px-8 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold hover:bg-gray-50 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
