import { Tag, Plus, PlusCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { API } from "../api";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaFolder } from "react-icons/fa";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState({ name: "", slug: "", image: "" });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/api/admin/categories");
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!newCat.name || !newCat.slug) return toast.error("Name and Slug are required");
    
    try {
      await API.post("/api/admin/categories", newCat);
      toast.success("Category added");
      setNewCat({ name: "", slug: "", image: "" });
      fetchCategories();
    } catch (err) {
      toast.error("Failed to add category");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await API.delete(`/api/admin/categories/${id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Category management</h1>
          <p className="text-gray-500 mt-1">Organize your store structure</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FORM */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 h-fit">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FaPlus className="text-pink-600 text-sm" />
            Add New Category
          </h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Name</label>
              <input 
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-100 focus:border-pink-600 outline-none transition-all"
                value={newCat.name}
                onChange={e => setNewCat({...newCat, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-')})}
                placeholder="e.g. Skin Care"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Slug</label>
              <input 
                className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                value={newCat.slug}
                readOnly
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 block mb-1">Icon/Image URL</label>
              <input 
                className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-100 focus:border-pink-600 outline-none transition-all"
                value={newCat.image}
                onChange={e => setNewCat({...newCat, image: e.target.value})}
                placeholder="https://..."
              />
            </div>
            <button type="submit" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200">
              Create Category
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
             <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 animate-pulse">
               <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-4"></div>
               <div className="h-4 w-32 bg-gray-100 mx-auto rounded"></div>
             </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-gray-100">
               <FaFolder className="text-gray-200 text-5xl mx-auto mb-4" />
               <p className="text-gray-500 font-medium">No categories created yet</p>
            </div>
          ) : (
            categories.map(cat => (
              <div key={cat._id} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  {cat.image ? (
                    <img src={cat.image} className="w-12 h-12 rounded-2xl object-cover bg-gray-50" />
                  ) : (
                    <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                      <FaFolder />
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-gray-900">{cat.name}</h3>
                    <p className="text-xs text-gray-500">/{cat.slug}</p>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(cat._id)}
                  className="p-3 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
