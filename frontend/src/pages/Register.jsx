import { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) {
      err.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) err.email = "Invalid email format";
    }
    if (!form.password.trim()) {
      err.password = "Password is required";
    } else if (form.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSuccess(true);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-6 relative overflow-hidden">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <div className="absolute top-[-15%] right-[-10%] w-[60%] h-[60%] bg-[#FBCFE8] rounded-full blur-[140px]" />
         <div className="absolute bottom-[-15%] left-[-10%] w-[60%] h-[60%] bg-[#C9A84C] rounded-full blur-[140px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-lg bg-white/70 backdrop-blur-3xl rounded-[3rem] p-10 lg:p-14 shadow-[0_40px_120px_rgba(0,0,0,0.05)] border border-white"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2.5rem] bg-slate-900 text-[#C9A84C] mb-8 shadow-2xl">
            <FiUser size={32} />
          </div>
          <h2 className="text-4xl font-light text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Create your Profile
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Begin your Boutique Experience</p>
        </div>

        {success && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#FBCFE8]/20 text-[#EC4899] p-4 rounded-2xl mb-8 text-center text-xs font-bold tracking-widest border border-[#FBCFE8]/30"
          >
            Sovereignty Secured: Account Curated.
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Full Identity</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={`boutique-input ${errors.name ? "border-red-200" : ""}`}
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Digital Destination</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className={`boutique-input ${errors.email ? "border-red-200" : ""}`}
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Secure Seal</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className={`boutique-input ${errors.password ? "border-red-200" : ""}`}
            />
          </div>

          <button
            type="submit"
            className="boutique-btn mt-10"
          >
            Acquire Access
          </button>
        </form>

        <div className="mt-10 text-center">
          <Link 
            to="/login"
            className="text-[10px] font-bold text-[#FBCFE8] uppercase tracking-[0.3em] hover:text-slate-900 transition-colors"
          >
            Known Member? Authenticate
          </Link>
        </div>
      </motion.div>

      <style>{`
        .boutique-input {
          width: 100%;
          padding: 18px 24px;
          background: #FFFFFF;
          border: 1px solid #F1F5F9;
          border-radius: 20px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: #1E293B;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 20px rgba(0,0,0,0.01);
        }

        .boutique-input::placeholder { color: #CBD5E1; letter-spacing: 0.05em; font-weight: 400; }
        
        .boutique-input:focus {
          outline: none;
          border-color: #FBCFE8;
          box-shadow: 0 15px 40px rgba(251,207,232,0.15);
          transform: translateY(-2px);
        }

        .boutique-btn {
          width: 100%;
          padding: 20px;
          background: #0F172A;
          color: #FFFFFF;
          font-family: 'Jost', sans-serif;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 20px 50px rgba(15,23,42,0.15);
        }

        .boutique-btn:hover {
          background: #000000;
          transform: translateY(-4px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.25);
          color: #C9A84C;
        }

        .boutique-btn:active { transform: translateY(0); }
      `}</style>
    </div>
  );
}
