// // import React, { useState } from "react";
// // import { FiUser } from "react-icons/fi";
// // import { API } from "./api";
// // import toast from "react-hot-toast";

// // export default function Login() {
// //   const [mode, setMode] = useState("login"); // login | signup | forgot
// //   const [step, setStep] = useState(1);
// //   const [otp, setOtp] = useState("");
// //   const [animating, setAnimating] = useState(false);

// //   const [form, setForm] = useState({
// //     name: "",
// //     contact: "",
// //     password: "",
// //     newPassword: "",
// //   });

// //   const handleChange = (e) =>
// //     setForm({ ...form, [e.target.name]: e.target.value });

// //   /* ================= PREMIUM LOGIN-ONLY TOAST ================= */
// //   const loginToast = (message) => {
// //     toast(message, {
// //       duration: 2200,
// //       style: {
// //         background: "#7dd3fc",
// //         color: "#0f172a",
// //         padding: "10px 22px",
// //         borderRadius: "9999px",
// //         fontSize: "14px",
// //         fontWeight: 500,
// //         boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
// //       },
// //     });
// //   };

// //   /* ================= MODE SWITCH ================= */
// //   const switchMode = (nextMode) => {
// //     setAnimating(true);
// //     setTimeout(() => {
// //       setMode(nextMode);
// //       setStep(1);
// //       setAnimating(false);
// //     }, 300);
// //   };

// //   /* ================= LOGIN ================= */
// //   const handleLogin = async () => {
// //     if (!form.contact || !form.password) {
// //       loginToast("Email and password required");
// //       return;
// //     }

// //     try {
// //       const res = await API.post("/auth/login", {
// //         email: form.contact,
// //         password: form.password,
// //       });

// //       localStorage.setItem("token", res.data.token);
// //       localStorage.setItem("username", res.data.user.name);
// //       localStorage.setItem("userId", res.data.user._id);

// //       loginToast("Welcome back");
// //       window.location.href = "/";
// //     } catch {
// //       loginToast("Invalid credentials");
// //     }
// //   };

// //   /* ================= SIGNUP ================= */
// //   const sendSignupOtp = async () => {
// //     if (!form.name || !form.contact || !form.password) {
// //       loginToast("All fields required");
// //       return;
// //     }

// //     try {
// //       await API.post("/auth/signup/send-otp", {
// //         contact: form.contact,
// //       });
// //       loginToast("OTP sent");
// //       setStep(2);
// //     } catch {
// //       loginToast("Failed to send OTP");
// //     }
// //   };

// //   const verifySignupOtp = async () => {
// //     try {
// //       await API.post("/auth/signup/verify-otp", {
// //         name: form.name,
// //         contact: form.contact,
// //         password: form.password,
// //         otp,
// //       });

// //       loginToast("Account created");
// //       switchMode("login");
// //     } catch {
// //       loginToast("Invalid OTP");
// //     }
// //   };

// //   /* ================= FORGOT PASSWORD ================= */
// //   const sendResetOtp = async () => {
// //     if (!form.contact) {
// //       loginToast("Email required");
// //       return;
// //     }

// //     try {
// //       await API.post("/auth/forgot-password/send-otp", {
// //         email: form.contact,
// //       });
// //       loginToast("OTP sent");
// //       setStep(2);
// //     } catch {
// //       loginToast("OTP failed");
// //     }
// //   };

// //   const resetPassword = async () => {
// //     if (!otp || !form.newPassword) {
// //       loginToast("All fields required");
// //       return;
// //     }

// //     try {
// //       await API.post("/auth/forgot-password/verify-otp", {
// //         email: form.contact,
// //         otp,
// //         newPassword: form.newPassword,
// //       });

// //       loginToast("Password reset");
// //       switchMode("login");
// //     } catch {
// //       loginToast("Invalid OTP");
// //     }
// //   };

// //   const rightTitle =
// //     mode === "signup"
// //       ? "WELCOME TO SIGN UP"
// //       : mode === "forgot"
// //       ? "RESET ACCESS"
// //       : "WELCOME BACK";

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a]">
// //       <div className="relative p-[2px] rounded-2xl border border-cyan-400/40 shadow-[0_0_35px_rgba(0,255,255,0.2)]">
// //         <div className="flex overflow-hidden rounded-2xl bg-[#0f172a]">

// //           {/* LEFT PANEL */}
// //           <div
// //             className={`w-[420px] p-10 text-white transition-all duration-300
// //             ${animating ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"}`}
// //           >
// //             <h1 className="mb-6 text-3xl font-semibold capitalize">
// //               {mode}
// //             </h1>

// //             {mode === "login" && (
// //               <>
// //                 <input name="contact" placeholder="Email" onChange={handleChange} className="input" />
// //                 <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
// //                 <button onClick={handleLogin} className="btn">Login</button>

// //                 <p className="link" onClick={() => switchMode("forgot")}>
// //                   Forgot password?
// //                 </p>
// //               </>
// //             )}

// //             {mode === "signup" && step === 1 && (
// //               <>
// //                 <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
// //                 <input name="contact" placeholder="Email" onChange={handleChange} className="input" />
// //                 <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
// //                 <button onClick={sendSignupOtp} className="btn">Send OTP</button>
// //               </>
// //             )}

// //             {mode === "signup" && step === 2 && (
// //               <>
// //                 <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} className="input" />
// //                 <button onClick={verifySignupOtp} className="btn">Verify & Signup</button>
// //               </>
// //             )}

// //             {mode === "forgot" && step === 1 && (
// //               <>
// //                 <input name="contact" placeholder="Email" onChange={handleChange} className="input" />
// //                 <button onClick={sendResetOtp} className="btn">Send OTP</button>
// //               </>
// //             )}

// //             {mode === "forgot" && step === 2 && (
// //               <>
// //                 <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} className="input" />
// //                 <input name="newPassword" type="password" placeholder="New Password" onChange={handleChange} className="input" />
// //                 <button onClick={resetPassword} className="btn">Reset Password</button>
// //               </>
// //             )}

// //             <p
// //               className="mt-6 text-sm cursor-pointer text-cyan-400"
// //               onClick={() => switchMode(mode === "login" ? "signup" : "login")}
// //             >
// //               {mode === "login"
// //                 ? "New here? Create account"
// //                 : "Already have an account? Login"}
// //             </p>
// //           </div>

// //           {/* RIGHT PANEL */}
// //           <div className="w-[320px] flex items-center justify-center bg-[#020617] border-l border-cyan-400/20">
// //             <div className={`text-center transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}>
// //               <div className="flex justify-center mb-4">
// //                 <span className="p-3 rounded-full bg-orange-50">
// //                   <FiUser className="text-orange-500" size={28} />
// //                 </span>
// //               </div>
// //               <h2 className="text-3xl font-bold text-white">{rightTitle}</h2>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* LOCAL STYLES */}
// //       <style>{`
// //         .input {
// //           width: 100%;
// //           padding: 12px;
// //           margin-bottom: 14px;
// //           background: transparent;
// //           border: 1px solid rgba(34,211,238,0.3);
// //           border-radius: 6px;
// //           color: white;
// //         }

// //         .input:focus {
// //           outline: none;
// //           border-color: rgb(34,211,238);
// //         }

// //         .btn {
// //           width: 100%;
// //           padding: 12px;
// //           background: rgb(34,211,238);
// //           color: black;
// //           font-weight: 600;
// //           border-radius: 6px;
// //           margin-top: 4px;
// //           cursor: pointer;
// //           transition: transform 0.15s ease, box-shadow 0.15s ease;
// //         }

// //         .btn:hover {
// //           transform: translateY(-1px);
// //           box-shadow: 0 6px 18px rgba(34,211,238,0.35);
// //         }

// //         .btn:disabled {
// //           cursor: not-allowed;
// //           opacity: 0.6;
// //         }

// //         .link {
// //           margin-top: 10px;
// //           font-size: 14px;
// //           color: rgb(34,211,238);
// //           cursor: pointer;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { FiUser } from "react-icons/fi";
// import { GoogleLogin } from "@react-oauth/google";
// import { API } from "./api";
// import toast from "react-hot-toast";

// export default function Login() {
//   const [mode, setMode] = useState("login"); // login | signup | forgot
//   const [step, setStep] = useState(1);
//   const [otp, setOtp] = useState("");
//   const [animating, setAnimating] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     contact: "",
//     password: "",
//     newPassword: "",
//   });

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   /* ================= PREMIUM TOAST ================= */
//   const loginToast = (message) => {
//     toast(message, {
//       duration: 2200,
//       style: {
//         background: "#7dd3fc",
//         color: "#0f172a",
//         padding: "10px 22px",
//         borderRadius: "9999px",
//         fontSize: "14px",
//         fontWeight: 500,
//         boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
//       },
//     });
//   };

//   /* ================= MODE SWITCH ================= */
//   const switchMode = (nextMode) => {
//     setAnimating(true);
//     setTimeout(() => {
//       setMode(nextMode);
//       setStep(1);
//       setOtp("");
//       setAnimating(false);
//     }, 300);
//   };

//   /* ================= LOGIN ================= */
//   const handleLogin = async () => {
//     if (!form.contact || !form.password) {
//       loginToast("Email and password required");
//       return;
//     }

//     try {
//       const res = await API.post("/auth/login", {
//         email: form.contact,
//         password: form.password,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("username", res.data.user.name);

//       loginToast("Welcome back");
//       window.location.href = "/";
//     } catch {
//       loginToast("Invalid credentials");
//     }
//   };

//   /* ================= GOOGLE LOGIN ================= */
//   const handleGoogleLogin = async (credentialResponse) => {
//     try {
//       const res = await API.post("/auth/google-login", {
//         token: credentialResponse.credential,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("username", res.data.user.name);

//       loginToast("Signed in with Google");
//       window.location.href = "/";
//     } catch {
//       loginToast("Google login failed");
//     }
//   };

//   /* ================= SIGNUP ================= */
//   const sendSignupOtp = async () => {
//     if (!form.name || !form.contact || !form.password) {
//       loginToast("All fields required");
//       return;
//     }

//     try {
//       await API.post("/auth/signup/send-otp", {
//         contact: form.contact,
//       });
//       loginToast("OTP sent");
//       setStep(2);
//     } catch {
//       loginToast("Failed to send OTP");
//     }
//   };

//   const verifySignupOtp = async () => {
//     try {
//       await API.post("/auth/signup/verify-otp", {
//         name: form.name,
//         contact: form.contact,
//         password: form.password,
//         otp,
//       });

//       loginToast("Account created");
//       switchMode("login");
//     } catch {
//       loginToast("Invalid OTP");
//     }
//   };

//   /* ================= FORGOT PASSWORD ================= */
//   const sendResetOtp = async () => {
//     if (!form.contact) {
//       loginToast("Email required");
//       return;
//     }

//     try {
//       await API.post("/auth/forgot-password/send-otp", {
//         email: form.contact,
//       });
//       loginToast("OTP sent");
//       setStep(2);
//     } catch {
//       loginToast("OTP failed");
//     }
//   };

//   const resetPassword = async () => {
//     if (!otp || !form.newPassword) {
//       loginToast("All fields required");
//       return;
//     }

//     try {
//       await API.post("/auth/forgot-password/verify-otp", {
//         email: form.contact,
//         otp,
//         newPassword: form.newPassword,
//       });

//       loginToast("Password reset");
//       switchMode("login");
//     } catch {
//       loginToast("Invalid OTP");
//     }
//   };

//   const rightTitle =
//     mode === "signup"
//       ? "WELCOME TO SIGN UP"
//       : mode === "forgot"
//       ? "RESET ACCESS"
//       : "WELCOME BACK";

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a]">
//       <div className="relative p-[2px] rounded-2xl border border-cyan-400/40 shadow-[0_0_35px_rgba(0,255,255,0.2)]">
//         <div className="flex overflow-hidden rounded-2xl bg-[#0f172a]">

//           {/* LEFT PANEL */}
//           <div
//             className={`w-[420px] p-10 text-white transition-all duration-300
//             ${animating ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"}`}
//           >
//             <h1 className="mb-6 text-3xl font-semibold capitalize">
//               {mode}
//             </h1>

//             {/* LOGIN */}
//             {mode === "login" && (
//               <>
//                 <div className="flex justify-center mb-4">
//                   <GoogleLogin
//                     onSuccess={handleGoogleLogin}
//                     onError={() => loginToast("Google login failed")}
//                     theme="outline"
//                     size="large"
//                     width="300"
//                   />
//                 </div>

//                 <div className="flex items-center my-3">
//                   <hr className="flex-grow border-cyan-400/20" />
//                   <span className="px-3 text-xs text-cyan-400">OR</span>
//                   <hr className="flex-grow border-cyan-400/20" />
//                 </div>

//                 <input
//                   name="contact"
//                   placeholder="Email"
//                   onChange={handleChange}
//                   className="input"
//                 />
//                 <input
//                   name="password"
//                   type="password"
//                   placeholder="Password"
//                   onChange={handleChange}
//                   className="input"
//                 />
//                 <button onClick={handleLogin} className="btn">
//                   Login
//                 </button>

//                 <p className="link" onClick={() => switchMode("forgot")}>
//                   Forgot password?
//                 </p>
//               </>
//             )}

//             {/* SIGNUP */}
//             {mode === "signup" && step === 1 && (
//               <>
//                 <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
//                 <input name="contact" placeholder="Email" onChange={handleChange} className="input" />
//                 <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
//                 <button onClick={sendSignupOtp} className="btn">Send OTP</button>
//               </>
//             )}

//             {mode === "signup" && step === 2 && (
//               <>
//                 <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} className="input" />
//                 <button onClick={verifySignupOtp} className="btn">Verify & Signup</button>
//               </>
//             )}

//             {/* FORGOT */}
//             {mode === "forgot" && step === 1 && (
//               <>
//                 <input name="contact" placeholder="Email" onChange={handleChange} className="input" />
//                 <button onClick={sendResetOtp} className="btn">Send OTP</button>
//               </>
//             )}

//             {mode === "forgot" && step === 2 && (
//               <>
//                 <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} className="input" />
//                 <input name="newPassword" type="password" placeholder="New Password" onChange={handleChange} className="input" />
//                 <button onClick={resetPassword} className="btn">Reset Password</button>
//               </>
//             )}

//             <p
//               className="mt-6 text-sm cursor-pointer text-cyan-400"
//               onClick={() => switchMode(mode === "login" ? "signup" : "login")}
//             >
//               {mode === "login"
//                 ? "New here? Create account"
//                 : "Already have an account? Login"}
//             </p>
//           </div>

//           {/* RIGHT PANEL */}
//           <div className="w-[320px] flex items-center justify-center bg-[#020617] border-l border-cyan-400/20">
//             <div className={`text-center transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}>
//               <div className="flex justify-center mb-4">
//                 <span className="p-3 rounded-full bg-orange-50">
//                   <FiUser className="text-orange-500" size={28} />
//                 </span>
//               </div>
//               <h2 className="text-3xl font-bold text-white">{rightTitle}</h2>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* LOCAL STYLES */}
//       <style>{`
//         .input {
//           width: 100%;
//           padding: 12px;
//           margin-bottom: 14px;
//           background: transparent;
//           border: 1px solid rgba(34,211,238,0.3);
//           border-radius: 6px;
//           color: white;
//         }
//         .input:focus {
//           outline: none;
//           border-color: rgb(34,211,238);
//         }
//         .btn {
//           width: 100%;
//           padding: 12px;
//           background: rgb(34,211,238);
//           color: black;
//           font-weight: 600;
//           border-radius: 6px;
//           margin-top: 4px;
//           cursor: pointer;
//           transition: transform 0.15s ease, box-shadow 0.15s ease;
//         }
//         .btn:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 6px 18px rgba(34,211,238,0.35);
//         }
//         .link {
//           margin-top: 10px;
//           font-size: 14px;
//           color: rgb(34,211,238);
//           cursor: pointer;
//         }
//       `}</style>
//     </div>
//   );
// }
import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { GoogleLogin } from "@react-oauth/google";
import { API } from "./api";
import toast from "react-hot-toast";

export default function Login() {
  const [mode, setMode] = useState("login"); // login | signup | forgot
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [animating, setAnimating] = useState(false);

  const [form, setForm] = useState({
    name: "",
    contact: "",
    password: "",
    newPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= TOAST ================= */
  const loginToast = (message) => {
    toast(message, {
      duration: 2200,
      style: {
        background: "#7dd3fc",
        color: "#0f172a",
        padding: "10px 22px",
        borderRadius: "9999px",
        fontSize: "14px",
        fontWeight: 500,
        boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
      },
    });
  };

  /* ================= MODE SWITCH ================= */
  const switchMode = (nextMode) => {
    setAnimating(true);
    setTimeout(() => {
      setMode(nextMode);
      setStep(1);
      setOtp("");
      setAnimating(false);
    }, 300);
  };

  /* ================= LOGIN ================= */
  const handleLogin = async () => {
    if (!form.contact || !form.password) {
      loginToast("Email and password required");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email: form.contact,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);

      loginToast("Welcome back");
      window.location.href = "/";
    } catch {
      loginToast("Invalid credentials");
    }
  };

  /* ================= GOOGLE LOGIN / SIGNUP ================= */
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await API.post("/auth/google-login", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);

      loginToast("Signed in with Google");
      window.location.href = "/";
    } catch {
      loginToast("Google authentication failed");
    }
  };

  /* ================= SIGNUP OTP ================= */
  const sendSignupOtp = async () => {
    if (!form.name || !form.contact || !form.password) {
      loginToast("All fields required");
      return;
    }

    try {
      await API.post("/auth/signup/send-otp", {
        contact: form.contact,
      });
      loginToast("OTP sent");
      setStep(2);
    } catch {
      loginToast("Failed to send OTP");
    }
  };

  const verifySignupOtp = async () => {
    try {
      await API.post("/auth/signup/verify-otp", {
        name: form.name,
        contact: form.contact,
        password: form.password,
        otp,
      });

      loginToast("Account created");
      switchMode("login");
    } catch {
      loginToast("Invalid OTP");
    }
  };

  /* ================= FORGOT PASSWORD ================= */
  const sendResetOtp = async () => {
    if (!form.contact) {
      loginToast("Email required");
      return;
    }

    try {
      await API.post("/auth/forgot-password/send-otp", {
        email: form.contact,
      });
      loginToast("OTP sent");
      setStep(2);
    } catch {
      loginToast("OTP failed");
    }
  };

  const resetPassword = async () => {
    if (!otp || !form.newPassword) {
      loginToast("All fields required");
      return;
    }

    try {
      await API.post("/auth/forgot-password/verify-otp", {
        email: form.contact,
        otp,
        newPassword: form.newPassword,
      });

      loginToast("Password reset");
      switchMode("login");
    } catch {
      loginToast("Invalid OTP");
    }
  };

  const rightTitle =
    mode === "signup"
      ? "WELCOME TO SIGN UP"
      : mode === "forgot"
      ? "RESET ACCESS"
      : "WELCOME BACK";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a]">
      <div className="relative p-[2px] rounded-2xl border border-cyan-400/40 shadow-[0_0_35px_rgba(0,255,255,0.2)]">
        <div className="flex overflow-hidden rounded-2xl bg-[#0f172a]">

          {/* LEFT PANEL */}
          <div
            className={`w-[420px] p-10 text-white transition-all duration-300
            ${animating ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"}`}
          >
            <h1 className="mb-6 text-3xl font-semibold capitalize">{mode}</h1>

            {/* LOGIN */}
            {mode === "login" && (
              <>
                <div className="flex justify-center mb-4">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => loginToast("Google login failed")}
                    width="300"
                  />
                </div>

                <Divider />

                <input name="contact" placeholder="Email" onChange={handleChange} className="input" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
                <button onClick={handleLogin} className="btn">Login</button>

                <p className="link" onClick={() => switchMode("forgot")}>Forgot password?</p>
              </>
            )}

            {/* SIGNUP */}
            {mode === "signup" && step === 1 && (
              <>
                <div className="flex justify-center mb-4">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => loginToast("Google signup failed")}
                    text="signup_with"
                    width="300"
                  />
                </div>

                <Divider />

                <input name="name" placeholder="Full Name" onChange={handleChange} className="input" />
                <input name="contact" placeholder="Email" onChange={handleChange} className="input" />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} className="input" />
                <button onClick={sendSignupOtp} className="btn">Send OTP</button>
              </>
            )}

            {mode === "signup" && step === 2 && (
              <>
                <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} className="input" />
                <button onClick={verifySignupOtp} className="btn">Verify & Signup</button>
              </>
            )}

            {/* FORGOT */}
            {mode === "forgot" && step === 1 && (
              <>
                <input name="contact" placeholder="Email" onChange={handleChange} className="input" />
                <button onClick={sendResetOtp} className="btn">Send OTP</button>
              </>
            )}

            {mode === "forgot" && step === 2 && (
              <>
                <input placeholder="OTP" onChange={(e) => setOtp(e.target.value)} className="input" />
                <input name="newPassword" type="password" placeholder="New Password" onChange={handleChange} className="input" />
                <button onClick={resetPassword} className="btn">Reset Password</button>
              </>
            )}

            <p className="mt-6 text-sm cursor-pointer text-cyan-400"
               onClick={() => switchMode(mode === "login" ? "signup" : "login")}>
              {mode === "login"
                ? "New here? Create account"
                : "Already have an account? Login"}
            </p>
          </div>

          {/* RIGHT PANEL */}
          <div className="w-[320px] flex items-center justify-center bg-[#020617] border-l border-cyan-400/20">
            <div className={`text-center transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}>
              <div className="flex justify-center mb-4">
                <span className="p-3 rounded-full bg-orange-50">
                  <FiUser className="text-orange-500" size={28} />
                </span>
              </div>
              <h2 className="text-3xl font-bold text-white">{rightTitle}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          margin-bottom: 14px;
          background: transparent;
          border: 1px solid rgba(34,211,238,0.3);
          border-radius: 6px;
          color: white;
        }
        .input:focus { outline: none; border-color: rgb(34,211,238); }
        .btn {
          width: 100%;
          padding: 12px;
          background: rgb(34,211,238);
          color: black;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
        }
        .link { margin-top: 10px; font-size: 14px; color: rgb(34,211,238); cursor: pointer; }
      `}</style>
    </div>
  );
}

/* Divider Component */
function Divider() {
  return (
    <div className="flex items-center my-3">
      <hr className="flex-grow border-cyan-400/20" />
      <span className="px-3 text-xs text-cyan-400">OR</span>
      <hr className="flex-grow border-cyan-400/20" />
    </div>
  );
}
