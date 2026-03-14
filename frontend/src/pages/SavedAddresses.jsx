import { useEffect, useState } from "react";
import { API } from "./api.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, 
  Plus, 
  Trash2, 
  Star, 
  Home, 
  Building2, 
  Phone,
  MoreVertical,
  ChevronRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAddresses = async () => {
    try {
      const res = await API.get("/api/address");
      setAddresses(res.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
      toast.error("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/address/${id}`);
      toast.success("Address removed");
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to delete address");
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await API.put(`/api/address/${id}/default`);
      toast.success("Default address updated");
      fetchAddresses();
    } catch (err) {
      toast.error("Failed to update default address");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-8 mb-16">
          <div>
            <h1 className="text-5xl font-light text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Delivery Destinations</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-4">Managing your global selection points</p>
          </div>
          <Link 
            to="/add-address" 
            className="flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-slate-200 group w-fit"
          >
            <Plus size={16} className="transition-transform group-hover:rotate-90" />
            Append New Destination
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-10">
          <AnimatePresence>
            {addresses.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] p-24 text-center border border-gray-100 shadow-sm"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mx-auto mb-8">
                  <MapPin size={32} />
                </div>
                <h2 className="text-3xl font-light text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>No destinations mapped</h2>
                <p className="text-sm text-gray-400 max-w-sm mx-auto font-medium leading-relaxed">Map your first delivery destination to enable our premium express services.</p>
              </motion.div>
            ) : (
              addresses.map((addr, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  key={addr._id}
                  className={`relative group bg-white rounded-[2.5rem] border transition-all duration-700 overflow-hidden ${
                    addr.isDefault 
                      ? "border-[#FBCFE8]/30 shadow-[0_30px_70px_rgba(251,207,232,0.1)]" 
                      : "border-gray-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
                  }`}
                >
                  <div className="p-10 md:p-12">
                    <div className="flex items-start justify-between gap-6 mb-10">
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center border transition-all duration-500 ${
                          addr.isDefault ? "bg-slate-900 border-slate-900 text-[#C9A84C]" : "bg-gray-50 border-gray-100 text-gray-300"
                        }`}>
                          {idx === 0 ? <Home size={24} strokeWidth={1.5} /> : <Building2 size={24} strokeWidth={1.5} />}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-800 uppercase tracking-tight" style={{ fontFamily: "'Jost', sans-serif" }}>{addr.fullName}</h3>
                          {addr.isDefault && (
                            <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#C9A84C] mt-2">
                              <div className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full animate-pulse" /> Primary Residence
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {!addr.isDefault && (
                          <button 
                            onClick={() => handleSetDefault(addr._id)}
                            className="p-3.5 text-gray-300 hover:text-[#C9A84C] hover:bg-gray-50 rounded-2xl transition-all duration-300"
                            title="Set as Primary"
                          >
                            <Star size={18} />
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(addr._id)}
                          className="p-3.5 text-gray-300 hover:text-red-400 hover:bg-red-50/50 rounded-2xl transition-all duration-300"
                          title="Release Destination"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <div className="flex gap-4">
                          <MapPin className="text-[#FBCFE8]/50 flex-shrink-0 mt-1" size={18} />
                          <p className="text-sm font-medium text-slate-500 leading-loose" style={{ fontFamily: "'Jost', sans-serif" }}>
                            {addr.street}<br />
                            {addr.city}, {addr.state} — <span className="text-slate-900 font-bold tracking-widest">{addr.pincode}</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-end items-start md:items-end">
                        <div className="flex items-center gap-4 bg-gray-50/50 px-6 py-4 rounded-2xl border border-gray-100">
                          <Phone size={14} className="text-gray-300" />
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest leading-none">{addr.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Boutique Footer */}
                  <div className="px-10 py-5 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">Global Logistics Network</p>
                       <div className="h-[1px] w-6 bg-gray-100" />
                    </div>
                    <Link to={`/edit-address/${addr._id}`} className="text-[9px] font-bold text-gray-400 hover:text-slate-900 uppercase tracking-widest transition-colors flex items-center gap-2 group/link">
                       Revise Details <ChevronRight size={12} className="text-[#C9A84C] group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.15)] relative overflow-hidden group">
           {/* Decorative flare */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FBCFE8]/10 to-transparent rounded-full -mr-48 -mt-48 blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-700"></div>
           
           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
             <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-[#C9A84C] border border-white/10 shadow-2xl overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FBCFE8]/5 to-transparent animate-shimmer" />
                  <Star size={32} fill="currentColor" />
                </div>
                <div>
                  <h4 className="text-2xl font-normal text-white mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Signature Fulfillment Status</h4>
                  <p className="text-[10px] text-[#FBCFE8] font-bold uppercase tracking-[0.3em]">Complementary White-Glove Delivery Enabled</p>
                </div>
             </div>
             <button className="bg-white text-slate-900 px-12 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#FBCFE8] transition-all duration-500 whitespace-nowrap">
               Explore Benefits
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}
