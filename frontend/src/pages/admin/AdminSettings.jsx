import React, { useState, useEffect } from "react";
import { API } from "../api";
import toast from "react-hot-toast";
import { Save, Globe, CreditCard, Clock, MapPin, Mail, Phone } from "lucide-react";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    storeName: "Marketzen Beauty",
    supportEmail: "hi@marketzen.com",
    supportPhone: "+1 (555) 000-0000",
    timezone: "UTC",
    currency: "INR",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await API.get("/api/admin/settings");
      if (Object.keys(res.data).length > 0) {
        setSettings(prev => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await API.post("/api/admin/settings", { settings });
      toast.success("Settings saved successfully");
    } catch (err) {
      toast.error("Failed to save settings");
    }
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-10 pb-20">
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Store Settings</h1>
        <p className="text-gray-500 mt-1">Configure your online presence and operations</p>
      </div>

      <div className="space-y-8">
        {/* GENERAL */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 space-y-8">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-50">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <Globe size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">General Information</h3>
              <p className="text-sm text-gray-500">Public details of your store</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Store Name</label>
              <input 
                value={settings.storeName}
                onChange={e => handleChange('storeName', e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-pink-500 border rounded-2xl outline-none transition-all font-bold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Timezone</label>
              <select 
                value={settings.timezone}
                onChange={e => handleChange('timezone', e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-pink-500 border rounded-2xl outline-none transition-all font-bold"
              >
                <option value="UTC">UTC (Universal)</option>
                <option value="IST">IST (India)</option>
                <option value="EST">EST (Eastern)</option>
              </select>
            </div>
          </div>
        </section>

        {/* SUPPORT */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 space-y-8">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-50">
            <div className="p-3 bg-pink-50 text-pink-600 rounded-2xl">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Customer Support</h3>
              <p className="text-sm text-gray-500">How customers can reach you</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Public Email</label>
              <input 
                type="email"
                value={settings.supportEmail}
                onChange={e => handleChange('supportEmail', e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-pink-500 border rounded-2xl outline-none transition-all font-bold" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Support Phone</label>
              <input 
                type="text"
                value={settings.supportPhone}
                onChange={e => handleChange('supportPhone', e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-transparent focus:bg-white focus:border-pink-500 border rounded-2xl outline-none transition-all font-bold" 
              />
            </div>
          </div>
        </section>

        {/* PAYMENTS */}
        <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/40 space-y-8">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-50">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <CreditCard size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold">Payments & Currency</h3>
              <p className="text-sm text-gray-500">Manage transactional settings</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-6 bg-pink-50/50 border border-pink-100 rounded-3xl">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center font-black text-blue-600 text-xl">R</div>
              <div>
                <p className="text-lg font-black text-gray-900">Razorpay Express</p>
                <p className="text-sm font-bold text-gray-500">Active and receiving payments</p>
              </div>
            </div>
            <span className="px-5 py-2 bg-green-500 text-white text-xs font-black rounded-full uppercase tracking-tighter">Live</span>
          </div>
        </section>

        {/* ACTIONS */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSave}
            className="flex items-center gap-3 px-12 py-5 bg-gray-900 text-white rounded-3xl font-black shadow-2xl shadow-gray-400 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Save size={20} />
            Update Store Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
