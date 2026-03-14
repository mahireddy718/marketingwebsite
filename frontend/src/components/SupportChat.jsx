import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { FaComments, FaTimes, FaPaperPlane, FaHeadset } from "react-icons/fa";
import axios from "axios";

const socket = io("https://ecommerce-x4vm.onrender.com");

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("ai"); // "ai" or "human"
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);
  const [guestId] = useState(() => "guest_" + Math.random().toString(36).substr(2, 9));
  const activeId = localStorage.getItem("userId") || guestId;
  const username = localStorage.getItem("username") || "Guest";

  useEffect(() => {
    if (activeId) {
      socket.emit("join_room", activeId);
      
      // Fetch chat history
      axios.get(`https://ecommerce-x4vm.onrender.com/api/chat/${activeId}`)
        .then(res => setChat(res.data))
        .catch(err => console.error("Error fetching chat:", err));
    }

    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, data]);
    });

    return () => socket.off("receive_message");
  }, [activeId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const messageData = {
      sender: activeId,
      receiver: mode === "ai" ? "AI" : "Admin",
      senderName: username,
      message: message,
      isAdmin: false,
      room: activeId,
      timestamp: new Date()
    };

    if (mode === "human") {
      socket.emit("send_message", messageData);
      setChat((prev) => [...prev, messageData]);
    } else {
      // AI Mode
      setChat((prev) => [...prev, messageData]);
      setMessage(""); // Clear input early for better UX
      
      try {
        const history = chat.map(m => ({
          role: m.isAdmin ? "assistant" : "user",
          content: m.message
        }));

        const res = await axios.post("https://ecommerce-x4vm.onrender.com/api/ai/chat", {
          message: message,
          userId: activeId,
          history: history
        });

        const aiReply = {
          sender: "AI",
          receiver: activeId,
          senderName: "AI Beauty Consultant",
          message: res.data.reply,
          isAdmin: true,
          timestamp: new Date()
        };
        setChat((prev) => [...prev, aiReply]);
      } catch (err) {
        console.error("AI Error:", err);
      }
    }
    if (mode === "human") setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* Floating Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110 ${
          isOpen ? "bg-slate-900 rotate-90" : "bg-[#EC4899]"
        }`}
      >
        {isOpen ? <FaTimes className="text-white text-xl" /> : <FaHeadset className="text-white text-xl" />}
        {!isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#C9A84C] border-2 border-white rounded-full animate-pulse" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`absolute bottom-20 right-0 w-[350px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-gray-100 overflow-hidden transition-all duration-500 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-10 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/30 flex items-center justify-center text-[#EC4899]">
                {mode === "ai" ? <div className="animate-pulse">✨</div> : <FaHeadset size={18} />}
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-tight uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>
                  {mode === "ai" ? "AI Beauty Consultant" : "MarketZen Support"}
                </h3>
                <p className="text-[10px] text-gray-400">
                  {mode === "ai" ? "Powered by MarketZen AI" : "Average response: 5 mins"}
                </p>
              </div>
            </div>
          </div>
          
          {/* Mode Toggle */}
          <div className="flex bg-slate-800 rounded-full p-1 gap-1">
            <button 
              onClick={() => setMode("ai")}
              className={`flex-1 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${mode === "ai" ? "bg-[#EC4899] text-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              Consultant Mode
            </button>
            <button 
              onClick={() => setMode("human")}
              className={`flex-1 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${mode === "human" ? "bg-[#EC4899] text-white" : "text-gray-500 hover:text-gray-300"}`}
            >
              Concierge Mode
            </button>
          </div>
        </div>

        {/* Messages area */}
        <div className="h-[350px] overflow-y-auto p-5 bg-gray-50/50 space-y-4">
          {chat.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-6">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 text-[#C9A84C]">
                <FaComments size={20} />
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hello <b>{username}</b>! 👋 <br />
                {mode === "ai" 
                  ? "I'm your AI Beauty Consultant. How can I help you sparkle today?"
                  : "Need help with an order or product? We're here for you."}
              </p>
            </div>
          ) : (
            chat.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.isAdmin ? "items-start" : "items-end"}`}
              >
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    msg.isAdmin
                      ? "bg-white text-slate-700 rounded-tl-none border border-gray-100"
                      : "bg-[#EC4899] text-white rounded-tr-none"
                  }`}
                >
                  {msg.message}
                </div>
                <span className="text-[9px] text-gray-400 mt-1 uppercase tracking-tighter">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
          <div className="relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3.5 px-5 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-[#EC4899]/20 transition-all font-medium"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-[#C9A84C] transition-colors"
            >
              <FaPaperPlane size={14} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportChat;
