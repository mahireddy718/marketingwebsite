import React, { useState, useEffect } from "react";
import { API } from "../api";
import toast from "react-hot-toast";
import { FaPlus, FaTrash, FaTicketAlt, FaPercent, FaMoneyBillWave } from "react-icons/fa";

export default function AdminMarketing() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percentage",
    discountAmount: "",
    minPurchase: 0,
    expiryDate: "",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await API.get("/api/admin/coupons");
      setCoupons(res.data);
    } catch (err) {
      toast.error("Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.discountAmount || !newCoupon.expiryDate) {
      return toast.error("Please fill all required fields");
    }

    try {
      await API.post("/api/admin/coupons", newCoupon);
      toast.success("Coupon created successfully");
      setNewCoupon({
        code: "",
        discountType: "percentage",
        discountAmount: "",
        minPurchase: 0,
        expiryDate: "",
      });
      fetchCoupons();
    } catch (err) {
      toast.error("Failed to create coupon");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      await API.delete(`/api/admin/coupons/${id}`);
      toast.success("Coupon deleted");
      fetchCoupons();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Marketing & Promotions</h1>
          <p className="text-gray-500 mt-1">Boost your sales with targeted campaigns</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CREATE COUPON */}
        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50 h-fit">
          <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
            <span className="p-2 bg-pink-100 text-pink-600 rounded-lg">
              <FaPlus size={14} />
            </span>
            Create New Coupon
          </h2>
          <form onSubmit={handleAddCoupon} className="space-y-6">
            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Coupon Code</label>
              <input 
                className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-pink-500 outline-none transition-all font-mono font-bold uppercase"
                value={newCoupon.code}
                onChange={e => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                placeholder="SAVE40"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Type</label>
                <select 
                  className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-pink-500 outline-none transition-all font-bold"
                  value={newCoupon.discountType}
                  onChange={e => setNewCoupon({...newCoupon, discountType: e.target.value})}
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed Amount</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Value</label>
                <input 
                  type="number"
                  className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-pink-500 outline-none transition-all font-bold"
                  value={newCoupon.discountAmount}
                  onChange={e => setNewCoupon({...newCoupon, discountAmount: e.target.value})}
                  placeholder="20"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-gray-400 uppercase tracking-widest block mb-1">Expiry Date</label>
              <input 
                type="date"
                className="w-full p-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-pink-500 outline-none transition-all font-bold"
                value={newCoupon.expiryDate}
                onChange={e => setNewCoupon({...newCoupon, expiryDate: e.target.value})}
              />
            </div>

            <button type="submit" className="w-full py-5 bg-pink-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-pink-700 transition-all shadow-xl shadow-pink-200">
              Launch Campaign
            </button>
          </form>
        </div>

        {/* ACTIVE COUPONS */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold mb-4">Active Promotions</h2>
          
          {loading ? (
             <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="h-24 bg-gray-50 rounded-3xl animate-pulse"></div>
                ))}
             </div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
               <FaTicketAlt className="text-gray-300 text-6xl mx-auto mb-4" />
               <p className="text-gray-500 font-bold text-lg">No active coupons</p>
               <p className="text-gray-400 text-sm">Start by creating your first discount code</p>
            </div>
          ) : (
            coupons.map(coupon => (
              <div key={coupon._id} className="relative overflow-hidden bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-50/30 rounded-full group-hover:scale-110 transition-transform"></div>
                
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${coupon.discountType === 'percentage' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>
                       {coupon.discountType === 'percentage' ? <FaPercent /> : <FaMoneyBillWave />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 tracking-tighter">{coupon.code}</h3>
                      <p className="text-sm font-bold text-gray-500">
                        {coupon.discountType === 'percentage' ? `${coupon.discountAmount}% OFF` : `₹${coupon.discountAmount} OFF`}
                        <span className="mx-2 text-gray-300">\u2022</span>
                        <span className="text-pink-500">Expires {new Date(coupon.expiryDate).toLocaleDateString()}</span>
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(coupon._id)}
                    className="p-4 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
