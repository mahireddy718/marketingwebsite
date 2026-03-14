import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { FaPaperPlane, FaUserCircle, FaHeadset, FaSearch, FaStar } from "react-icons/fa";
import axios from "axios";

const socket = io("https://ecommerce-x4vm.onrender.com");

const AdminSupport = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Join the global admin room for real-time notifications
    socket.emit("join_room", "admin");

    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://ecommerce-x4vm.onrender.com/api/admin/chat-users");
        setActiveUsers(res.data);
      } catch (err) {
        console.error("Error fetching chat users:", err);
      }
    };
    fetchUsers();

    const handleReceiveMessage = (data) => {
      // If message is for currently selected user, update chat
      if (selectedUser && data.room === selectedUser._id) {
        setChat((prev) => {
          // Check for duplication
          if (prev.some(m => m._id === data._id)) return prev;
          return [...prev, data];
        });
      }
      // Refresh user list to show last message/sender
      fetchUsers();
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [selectedUser?._id]);

  useEffect(() => {
    if (selectedUser) {
      axios.get(`https://ecommerce-x4vm.onrender.com/api/chat/${selectedUser._id}`)
        .then(res => setChat(res.data))
        .catch(err => console.error("Error fetching chat history:", err));
      
      socket.emit("join_room", selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim() || !selectedUser) return;

    const messageData = {
      sender: "Admin",
      receiver: selectedUser._id,
      senderName: "MarketZen Support",
      message: message,
      isAdmin: true,
      room: selectedUser._id,
      timestamp: new Date()
    };

    socket.emit("send_message", messageData);
    setChat((prev) => [...prev, messageData]);
    setMessage("");
  };

  const filteredUsers = activeUsers.filter(u => 
    u.senderName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100vh-120px)] bg-[#FAFAFA] rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white">
      {/* Sidebar: User List */}
      <div className="w-96 border-r border-gray-100 flex flex-col bg-slate-900 relative overflow-hidden">
        {/* Aesthetic Background Detail */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-gradient-to-br from-[#C9A84C]/20 to-transparent rounded-full blur-[100px]" />
        </div>

        <div className="p-10 relative z-10">
          <div className="space-y-4 mb-10">
            <h2 className="text-3xl text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Support <span className="text-[#C9A84C] italic">Sanctuary</span>
            </h2>
            <div className="h-px w-10 bg-[#C9A84C]/50" />
            <p className="text-[9px] font-bold text-[#FBCFE8] uppercase tracking-[0.4em]">Boutique Concierge Terminal</p>
          </div>
          
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search Member Conversations..."
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl py-4 px-6 pl-12 text-sm text-white placeholder:text-slate-500 focus:bg-slate-800 transition-all outline-none ring-1 ring-white/5 focus:ring-[#C9A84C]/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 text-xs transition-colors group-focus-within:text-[#C9A84C]" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto relative z-10 px-4 pb-10 space-y-2">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-xs text-slate-500 font-light italic uppercase tracking-widest">No Active Pursuits</p>
            </div>
          ) : (
            filteredUsers.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`w-full p-6 flex items-center gap-4 transition-all rounded-[2rem] text-left group ${
                  selectedUser?._id === user._id 
                    ? "bg-white/10 shadow-2xl ring-1 ring-white/10" 
                    : "hover:bg-white/5"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  selectedUser?._id === user._id ? "bg-[#C9A84C] text-white shadow-lg" : "bg-slate-800 text-slate-400 group-hover:text-[#FBCFE8]"
                }`}>
                  <FaUserCircle size={28} />
                </div>
                <div className="flex-1 truncate">
                  <h4 className={`text-sm font-bold uppercase tracking-wider mb-1 transition-colors ${
                    selectedUser?._id === user._id ? "text-white" : "text-slate-300 group-hover:text-white"
                  }`}>{user.senderName || "Mysterious Member"}</h4>
                  <p className="text-[10px] text-slate-500 truncate font-light tracking-wide">{user.lastMessage}</p>
                </div>
                {selectedUser?._id === user._id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white relative">
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white z-10">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#C9A84C] shadow-sm">
                  <FaUserCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>{selectedUser.senderName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">Live Session</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-slate-900 transition-all border border-gray-100 rounded-full hover:bg-gray-50 shadow-sm">Audit History</button>
                <button className="px-8 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-slate-900 rounded-full hover:bg-black transition-all shadow-xl shadow-slate-200">Finalize Resolve</button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-12 bg-[#FAFAFA] space-y-10">
              {chat.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}>
                  <div className="flex flex-col max-w-[65%] space-y-2">
                    <div className={`p-6 rounded-[2rem] text-sm leading-relaxed shadow-sm transition-all ${
                      msg.isAdmin 
                        ? "bg-slate-900 text-white rounded-tr-none shadow-xl shadow-slate-200" 
                        : "bg-white text-slate-700 rounded-tl-none border border-gray-100 shadow-sm"
                    }`}>
                      {msg.message}
                    </div>
                    <p className={`text-[9px] font-bold uppercase tracking-widest px-4 ${msg.isAdmin ? "text-right text-slate-400" : "text-gray-400"}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {msg.isAdmin ? "Concierge" : "Member"}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-8 bg-white border-t border-gray-100">
              <div className="flex gap-6 items-center">
                <div className="flex-1 relative group">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Compose your guidance..."
                    className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] px-8 py-5 text-sm focus:bg-white transition-all outline-none ring-1 ring-transparent focus:ring-[#C9A84C]/20 shadow-inner"
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[9px] font-bold text-gray-300 uppercase tracking-widest group-focus-within:opacity-0 transition-opacity">Press Enter to Dispatch</div>
                </div>
                <button
                  type="submit"
                  className="bg-slate-900 text-white w-16 h-16 rounded-[1.5rem] flex items-center justify-center hover:bg-black transition-all shadow-2xl shadow-slate-200 group"
                >
                  <FaPaperPlane size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-20 bg-white">
            <div className="relative mb-10">
              <div className="w-32 h-32 rounded-[3.5rem] bg-gray-50 border border-gray-100 flex items-center justify-center text-[#FBCFE8]">
                <FaHeadset size={48} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-[#C9A84C] flex items-center justify-center text-white shadow-xl animate-bounce">
                <FaStar size={16} />
              </div>
            </div>
            <h3 className="text-4xl text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Await Engagement</h3>
            <p className="text-sm text-gray-400 font-light italic tracking-wide max-w-sm">
              Select a member of the MarketZen elite from the sanctuary list to initiate a premium support bridge.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSupport;
