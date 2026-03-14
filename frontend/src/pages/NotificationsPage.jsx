import React from "react";
import { 
  Bell, 
  ShoppingBag, 
  Tag, 
  AlertCircle, 
  CheckCircle2, 
  Clock,
  MoreVertical,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";

const NotificationItem = ({ type, title, message, time, isRead }) => {
  const icons = {
    order: { icon: ShoppingBag, color: "bg-blue-50 text-blue-600", border: "border-blue-100" },
    promo: { icon: Tag, color: "bg-pink-50 text-pink-600", border: "border-pink-100" },
    alert: { icon: AlertCircle, color: "bg-amber-50 text-amber-600", border: "border-amber-100" },
    success: { icon: CheckCircle2, color: "bg-green-50 text-green-600", border: "border-green-100" },
  };

  const config = icons[type] || icons.order;
  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 rounded-[32px] bg-white border ${isRead ? 'border-gray-50' : 'border-pink-100 shadow-sm shadow-pink-50'} flex gap-6 items-start transition-all hover:shadow-md group`}
    >
      <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center transition-transform group-hover:scale-110 ${config.color} ${config.border} border`}>
        <Icon size={24} />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-start gap-4 mb-1">
          <h3 className={`font-black tracking-tight ${isRead ? 'text-gray-900' : 'text-gray-900 font-black'}`}>
            {title}
            {!isRead && <span className="inline-block w-2 h-2 rounded-full bg-pink-500 ml-2 mb-0.5"></span>}
          </h3>
          <span className="text-[10px] font-black text-gray-400 flex items-center gap-1 whitespace-nowrap uppercase tracking-widest">
            <Clock size={12} /> {time}
          </span>
        </div>
        <p className="text-sm text-gray-500 font-medium leading-relaxed">{message}</p>
      </div>

      <button className="text-gray-300 hover:text-gray-600 transition-colors p-2">
        <MoreVertical size={18} />
      </button>
    </motion.div>
  );
};

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "order",
      title: "Order Delivered",
      message: "Your package containing 'Luxury Silk Dress' has been delivered successfully. Enjoy your purchase!",
      time: "2 HOURS AGO",
      isRead: false
    },
    {
      id: 2,
      type: "promo",
      title: "Flash Sale Alert",
      message: "Don't miss out! Get up to 40% off on all accessories for the next 4 hours. Use code FLASH40.",
      time: "5 HOURS AGO",
      isRead: false
    },
    {
      id: 3,
      type: "alert",
      title: "Security Update",
      message: "A new login was detected from a new browser. If this wasn't you, please change your password immediately.",
      time: "1 DAY AGO",
      isRead: true
    },
    {
      id: 4,
      type: "success",
      title: "Points Awarded",
      message: "Congratulations! You've earned 15 Supercoins for your last order. View your balance now.",
      time: "2 DAYS AGO",
      isRead: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-gray-200">
                    <Bell size={20} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Center</h1>
            </div>
            <p className="text-sm text-gray-400 font-black uppercase tracking-[0.2em]">Stay updated with your activity</p>
          </div>
          <button className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-black transition-all hover:shadow-sm">
            <Settings size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-4 no-scrollbar">
            {['All', 'Orders', 'Promos', 'System'].map((cat, idx) => (
                <button 
                  key={cat} 
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${idx === 0 ? 'bg-pink-600 text-white shadow-xl shadow-pink-100' : 'bg-white text-gray-400 border border-gray-100 hover:border-pink-200 hover:text-pink-600'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notif) => (
            <NotificationItem key={notif.id} {...notif} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
            <button className="px-10 py-4 bg-white border border-gray-100 text-gray-400 rounded-[32px] text-xs font-black uppercase tracking-widest hover:bg-gray-50 hover:text-black transition-all">
                Load Older Notifications
            </button>
        </div>
      </div>
    </div>
  );
}
