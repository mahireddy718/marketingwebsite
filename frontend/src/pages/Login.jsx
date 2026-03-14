
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { API } from "./api";
import toast from "react-hot-toast";
import SupportChat from "../components/SupportChat";

export default function Login() {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [animating, setAnimating] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    password: "",
    newPassword: "",
    role: "customer"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginToast = (message) => {
    toast(message); // Uses the global premium toast config we set in App.jsx
  };

  /* ================= MODE SWITCH ================= */
  const switchMode = (nextMode) => {
    setAnimating(true);
    setTimeout(() => {
      setMode(nextMode);
      setStep(1);
      setAnimating(false);
    }, 300);
  };

  /* ================= EMAIL LOGIN ================= */
  const handleLogin = async () => {
    if (!form.contact || !form.password) {
      loginToast("Credentials required");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email: form.contact,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("role", res.data.user.role);

      loginToast("Welcome to MarketZen");
      window.location.href = "/";
    } catch {
      loginToast("Access Denied: Invalid Credentials");
    }
  };

  /* ================= GOOGLE LOGIN ================= */
  const [showGoogleBtn, setShowGoogleBtn] = useState(false);

  const handleGoogleLogin = async (credential) => {
    try {
      const res = await API.post("/auth/google", {
        token: credential,
        role: form.role,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("role", res.data.user.role);

      loginToast("Aesthetic Entry: Google Verified");
      window.location.href = "/";
    } catch {
      loginToast("Google Authentication Failed");
    }
  };

  /* ================= SIGNUP ================= */
  const nextToRole = () => {
    if (!form.name || !form.contact || !form.password) {
      loginToast("All details are essential");
      return;
    }
    setStep(2); // Role selection
  };

  const sendSignupOtp = async () => {
    try {
      await API.post("/auth/signup/send-otp", {
        contact: form.contact,
      });
      loginToast("Verification code dispatched");
      setStep(3); // OTP entry
    } catch {
      loginToast("Dispatch Failed");
    }
  };

  const verifySignupOtp = async () => {
    try {
      await API.post("/auth/signup/verify-otp", {
        name: form.name,
        contact: form.contact,
        password: form.password,
        role: form.role,
        otp,
      });

      loginToast("Account Curated Successfully");
      switchMode("login");
    } catch {
      loginToast("Invalid Verification Code");
    }
  };

  const RoleSelector = () => (
    <div className="grid grid-cols-2 gap-4 mt-6 mb-8">
      {["customer", "admin", "manager", "vendor"].map((r) => (
        <div
          key={r}
          onClick={() => setForm({ ...form, role: r })}
          className={`px-4 py-3.5 rounded-2xl border transition-all duration-500 text-center capitalize text-[10px] font-bold tracking-[0.2em] cursor-pointer ${
            form.role === r
              ? "bg-slate-900 border-slate-900 text-[#C9A84C] shadow-2xl shadow-slate-200"
              : "bg-white border-gray-100 text-gray-400 hover:border-[#FBCFE8]"
          }`}
        >
          {r}
        </div>
      ))}
    </div>
  );

  /* ================= FORGOT PASSWORD ================= */
  const sendResetOtp = async () => {
    if (!form.contact) {
      loginToast("Email is required");
      return;
    }

    try {
      await API.post("/auth/forgot-password/send-otp", {
        email: form.contact,
      });
      loginToast("Code sent");
      setStep(2);
    } catch {
      loginToast("Request failed");
    }
  };

  const resetPassword = async () => {
    if (!otp || !form.newPassword) {
      loginToast("All fields are required");
      return;
    }

    try {
      await API.post("/auth/forgot-password/verify-otp", {
        email: form.contact,
        otp,
        newPassword: form.newPassword,
      });

      loginToast("Credentials updated");
      switchMode("login");
    } catch {
      loginToast("Update failed");
    }
  };

  const rightTitle =
    mode === "signup"
      ? "Join MarketZen"
      : mode === "forgot"
      ? "Restore Access"
      : "Welcome Back";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] p-6">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FBCFE8] rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C9A84C] rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden border border-white flex flex-col md:flex-row">
        
        {/* LEFT PANEL: AUTH FORM */}
        <div className={`flex-1 p-12 lg:p-16 transition-all duration-700 ${animating ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"}`}>
          <div className="mb-12">
            <h1 className="text-5xl font-light text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{mode}</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Accessing the Boutique Collection</p>
          </div>

          <div className="space-y-6">
            {mode === "login" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Email Destination</label>
                  <input name="contact" placeholder="Email Address" onChange={handleChange} className="boutique-input" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-4">Secure Key</label>
                  <input name="password" type="password" placeholder="Password" onChange={handleChange} className="boutique-input" />
                </div>

                <button onClick={handleLogin} className="boutique-btn">Begin Journey</button>

                {/* GOOGLE LOGIN REDESIGN */}
                <div className="mt-12 pt-10 border-t border-gray-50 flex flex-col items-center">
                  {!showGoogleBtn ? (
                    <button 
                      onClick={() => setShowGoogleBtn(true)}
                      className="group flex items-center gap-4 bg-white border border-gray-100 px-10 py-5 rounded-2xl transition-all hover:border-[#FBCFE8] hover:shadow-xl hover:shadow-gray-100"
                    >
                       <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                       <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-900 transition-colors">Authenticate with Google</span>
                    </button>
                  ) : (
                    <div className="w-full animate-in fade-in duration-700 slide-in-from-bottom-5">
                      <p className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-[0.3em] text-center mb-6">Select your Identity Role</p>
                      <RoleSelector />
                      <div className="flex justify-center">
                        <GoogleLogin
                          onSuccess={(res) => handleGoogleLogin(res.credential)}
                          onError={() => loginToast("Authentication Failed")}
                          theme="outline"
                          shape="pill"
                          width="300"
                        />
                      </div>
                      <button 
                        onClick={() => setShowGoogleBtn(false)}
                        className="w-full mt-8 text-[9px] font-bold text-gray-300 hover:text-red-400 uppercase tracking-[0.2em] transition-colors"
                      >
                        Abandon Authentication
                      </button>
                    </div>
                  )}
                </div>

                <p className="mt-8 text-[10px] font-bold text-[#C9A84C] uppercase tracking-widest text-center cursor-pointer hover:text-slate-900 transition-colors" onClick={() => switchMode("forgot")}>
                  Forgot Credentials?
                </p>
              </>
            )}

            {mode === "signup" && step === 1 && (
              <>
                <input name="name" placeholder="Full Name" onChange={handleChange} className="boutique-input" />
                <input name="contact" placeholder="Email Address" onChange={handleChange} className="boutique-input" />
                <input name="password" type="password" placeholder="Secure Password" onChange={handleChange} className="boutique-input" />
                <button onClick={nextToRole} className="boutique-btn">Proceed to Role</button>
              </>
            )}

            {mode === "signup" && step === 2 && (
              <>
                <h2 className="text-xl font-light text-slate-800 mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>Define your Identity</h2>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-6">Joining the MarketZen Ecosystem</p>
                <RoleSelector />
                <button onClick={sendSignupOtp} className="boutique-btn">Verify as {form.role}</button>
                <button onClick={() => setStep(1)} className="w-full mt-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Return to Details</button>
              </>
            )}

            {mode === "signup" && step === 3 && (
              <>
                <p className="mb-8 text-sm text-slate-500 font-medium leading-relaxed italic">A verification essence has been sent to <b>{form.contact}</b></p>
                <input placeholder="Verification Code" onChange={(e) => setOtp(e.target.value)} className="boutique-input text-center text-lg tracking-[0.5em]" />
                <button onClick={verifySignupOtp} className="boutique-btn">Complete Acquisition</button>
                <button onClick={() => setStep(2)} className="w-full mt-6 text-[10px] font-bold text-gray-300 uppercase tracking-widest">Adjust Role</button>
              </>
            )}

            {mode === "forgot" && step === 1 && (
              <>
                <input name="contact" placeholder="Registered Email" onChange={handleChange} className="boutique-input" />
                <button onClick={sendResetOtp} className="boutique-btn">Request Recovery</button>
              </>
            )}

            {mode === "forgot" && step === 2 && (
              <>
                <input placeholder="Recovery Code" onChange={(e) => setOtp(e.target.value)} className="boutique-input" />
                <input name="newPassword" type="password" placeholder="New Secret Key" onChange={handleChange} className="boutique-input" />
                <button onClick={resetPassword} className="boutique-btn">Restore Sovereignty</button>
              </>
            )}

            <div className="pt-10 text-center">
              <p className="text-[10px] font-bold text-[#FBCFE8] uppercase tracking-[0.3em] cursor-pointer hover:text-slate-900 transition-colors"
                onClick={() => {
                  setShowGoogleBtn(false);
                  switchMode(mode === "login" ? "signup" : "login");
                }}>
                {mode === "login"
                  ? "New to Zen? Create a Profile"
                  : "Known Member? Authenticate Here"}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: AESTHETIC SPLASH */}
        <div className="w-full md:w-[400px] bg-slate-900 relative flex items-center justify-center p-12 overflow-hidden">
           {/* Decorative background flare */}
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#FBCFE8]/10 to-transparent opacity-50" />
           
           <div className={`text-center space-y-8 relative z-10 transition-all duration-700 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
             <div className="flex justify-center">
                <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-[#C9A84C] shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FBCFE8]/5 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-1000" />
                  <FiUser size={40} strokeWidth={1} />
                </div>
             </div>
             
             <div className="space-y-4">
                <h2 className="text-5xl font-light text-white leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>{rightTitle}</h2>
                <div className="h-px w-12 bg-[#C9A84C] mx-auto" />
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.4em] px-8 leading-relaxed">Defining the standard of boutique luxury.</p>
             </div>
           </div>

           {/* Bottom subtle branding */}
           <div className="absolute bottom-10 text-[8px] font-bold text-white/20 uppercase tracking-[0.8em]">MarketZen • Elite</div>
        </div>
      </div>

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
          margin-top: 24px;
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
      
      {/* ADD CONSTUMER SUPPORT BACK */}
      <div style={{ position: 'fixed', zIndex: 9999 }}>
        <SupportChat />
      </div>
    </div>
  );
}
