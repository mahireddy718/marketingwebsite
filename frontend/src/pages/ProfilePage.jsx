import React, { useState, useEffect } from "react";
import { API } from "./api";
import { FaUser, FaEnvelope, FaShieldAlt, FaCoins, FaCheckCircle, FaUserTag } from "react-icons/fa";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-32 text-center">
        <h2 className="text-3xl font-light text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Identity Lost</h2>
        <p className="text-sm text-gray-400 font-medium">Failed to retrieve your elite status information. Please re-authenticate.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header section: Luxury Identity */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] shadow-[0_10px_60px_rgba(0,0,0,0.03)] border border-gray-50 p-10 md:p-16 mb-12 relative overflow-hidden group"
        >
          {/* Subtle brand watermark */}
          <div className="absolute top-0 right-0 p-6 opacity-[0.03] select-none pointer-events-none">
             <h3 className="text-9xl font-bold uppercase tracking-tighter" style={{ fontFamily: "'Jost', sans-serif" }}>ZEN</h3>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-40 h-40 rounded-full border-4 border-[#FBCFE8]/20 p-1 relative overflow-hidden">
               <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-300 text-6xl font-light border border-[#C9A84C]/20 shadow-inner overflow-hidden">
                  {user.name ? (
                    <span className="text-slate-800" style={{ fontFamily: "'Playfair Display', serif" }}>{user.name.charAt(0).toUpperCase()}</span>
                  ) : <FaUser />}
               </div>
               <div className="absolute bottom-2 right-2 w-6 h-6 bg-[#C9A84C] rounded-full border-2 border-white flex items-center justify-center text-white text-[8px] font-bold">
                  ✓
               </div>
            </div>

            <div className="text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-4">
                 <h1 className="text-5xl font-light text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{user.name}</h1>
                 <span className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-[0.3em]" style={{ fontFamily: "'Jost', sans-serif" }}>Elite Resident</span>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FBCFE8]/10 text-[#FBCFE8] text-[9px] font-bold uppercase tracking-widest border border-[#FBCFE8]/20">
                  <FaUserTag size={10} /> {user.role}
                </span>
                {user.isVerified && (
                  <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-[9px] font-bold uppercase tracking-widest border border-[#C9A84C]/20">
                    <FaCheckCircle size={10} /> Authenticated
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Personal Details: Minimal Luxury */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] p-10 h-full"
          >
            <h2 className="text-xl font-normal text-slate-900 mb-10 border-b border-gray-50 pb-6" style={{ fontFamily: "'Playfair Display', serif" }}>Account Dossier</h2>
            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#FBCFE8]/10 group-hover:text-[#FBCFE8] transition-all">
                  <FaUser size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none">Legal Identifier</p>
                  <p className="text-sm font-bold text-slate-800 uppercase tracking-tight" style={{ fontFamily: "'Jost', sans-serif" }}>{user.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#FBCFE8]/10 group-hover:text-[#FBCFE8] transition-all">
                  <FaEnvelope size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none">Electronic Mail</p>
                  <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Jost', sans-serif" }}>{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-[#FBCFE8]/10 group-hover:text-[#FBCFE8] transition-all">
                  <FaShieldAlt size={16} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-none">Boutique Trust</p>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${user.isVerified ? "text-green-500" : "text-[#C9A84C]"}`}>
                    {user.isVerified ? "Platinum Verified" : "Verification Pending"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Loyalty: The Black/Gold Elite Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-900 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.1)] p-10 text-white h-full relative overflow-hidden flex flex-col"
          >
            {/* Holographic accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#C9A84C]/20 to-transparent rounded-full -mr-32 -mt-32 blur-3xl opacity-30 animate-pulse"></div>
            
            <div className="relative z-10 flex-grow flex flex-col">
              <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A84C]">MarketZen Premium</h2>
                <div className="text-[8px] font-bold px-3 py-1 bg-white/5 rounded-full border border-white/10 uppercase tracking-widest">EST. {new Date(user.createdAt || Date.now()).getFullYear()}</div>
              </div>
              
              <div className="flex-grow flex flex-col items-center justify-center">
                <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 shadow-2xl">
                  <FaCoins className="text-[#C9A84C] text-3xl" />
                </div>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-[0.4em] mb-3">Zen Coin Balance</p>
                <div className="flex items-baseline gap-2">
                   <p className="text-7xl font-normal tracking-tighter" style={{ fontFamily: "'Playfair Display', serif" }}>{user.superCoins || 0}</p>
                   <span className="text-[10px] font-bold text-[#C9A84C] uppercase mb-2 animate-bounce">Exclusive</span>
                </div>
                <p className="text-[10px] font-bold text-white/60 tracking-[0.3em] uppercase mt-4">DIAMOND MEMBER</p>
              </div>

              <div className="mt-10 pt-8 border-t border-white/5">
                <p className="text-center text-[9px] text-white/30 uppercase tracking-[0.2em] font-medium leading-relaxed italic">
                  Curated through loyalty. Your selections inspire us.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions: Minimal Boutique Style */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-[2rem] border border-gray-100 p-8 flex flex-wrap justify-center gap-6 shadow-sm"
        >
          <button className="px-10 py-4 rounded-2xl bg-white border border-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#C9A84C] hover:border-[#FBCFE8] hover:shadow-xl hover:shadow-gray-100 transition-all duration-500">Update Profile</button>
          <button className="px-10 py-4 rounded-2xl bg-white border border-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#C9A84C] hover:border-[#FBCFE8] hover:shadow-xl hover:shadow-gray-100 transition-all duration-500">Security Vault</button>
          <button className="px-10 py-4 rounded-2xl bg-white border border-gray-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#C9A84C] hover:border-[#FBCFE8] hover:shadow-xl hover:shadow-gray-100 transition-all duration-500">Manage Destinations</button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
