import { useEffect, useState } from "react";
import { API } from "./api.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Ticket, 
  Clock, 
  Copy, 
  CheckCircle2, 
  AlertCircle,
  Tag,
  Zap
} from "lucide-react";
import toast from "react-hot-toast";

const CouponCard = ({ coupon }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const isExpired = new Date(coupon.expiryDate) < new Date();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden bg-white rounded-[32px] border ${
        isExpired ? 'border-gray-100 opacity-60' : 'border-pink-100 shadow-sm hover:shadow-xl hover:shadow-pink-50 transition-all duration-500 ring-1 ring-pink-50'
      }`}
    >
      {/* Decorative background elements */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-pink-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50" />
      
      <div className="p-8 relative">
        <div className="flex items-start justify-between mb-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
            isExpired ? 'bg-gray-100 text-gray-400' : 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-100'
          }`}>
            <Ticket size={28} />
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Status</p>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
              isExpired ? 'bg-gray-100 text-gray-500' : 'bg-green-100 text-green-600'
            }`}>
              {isExpired ? 'Expired' : 'Active'}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-3xl font-black text-gray-900 leading-tight">
            {coupon.discountType === 'percentage' ? `${coupon.discountAmount}% OFF` : `₹${coupon.discountAmount} OFF`}
          </h3>
          <p className="text-gray-500 font-medium mt-1">
            Min. purchase of <span className="text-black font-bold">₹{coupon.minPurchase}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-pink-500 opacity-0 group-hover:opacity-5 blur-xl transition-opacity rounded-2xl" />
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100 group-hover:border-pink-200 transition-colors">
              <code className="text-lg font-black text-gray-900 tracking-widest">{coupon.code}</code>
              <button 
                onClick={handleCopy}
                className={`p-2 rounded-xl transition-all ${
                  copied ? 'bg-green-500 text-white shadow-lg shadow-green-100' : 'bg-white text-gray-400 hover:text-pink-600 shadow-sm border border-gray-100'
                }`}
              >
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-bold">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock size={14} />
              <span>Expires {new Date(coupon.expiryDate).toLocaleDateString()}</span>
            </div>
            {!isExpired && (
              <div className="flex items-center gap-1.5 text-pink-500 italic">
                <Zap size={12} fill="currentColor" />
                <span>Limited Time</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Punched hole effect at the bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-4 bg-gray-50 rounded-t-full border-t border-l border-r border-gray-100" />
    </motion.div>
  );
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await API.get("/coupons");
        setCoupons(res.data);
      } catch (err) {
        console.error("Error fetching coupons:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoupons();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center">
               <Tag size={24} />
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">My Coupons</h1>
          </div>
          <p className="text-gray-500 text-lg font-medium max-w-xl">
            Save big on your next purchase! Use these exclusive coupon codes at checkout.
          </p>
        </div>
        
        <div className="bg-white px-8 py-5 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-6">
           <div className="text-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Available</p>
             <p className="text-2xl font-black text-gray-900">{coupons.filter(c => new Date(c.expiryDate) >= new Date()).length}</p>
           </div>
           <div className="w-px h-10 bg-gray-100" />
           <div className="text-center">
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Savings</p>
             <p className="text-2xl font-black text-pink-500 italic">Up to 50%</p>
           </div>
        </div>
      </div>

      <AnimatePresence>
        {coupons.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-50 rounded-[48px] p-24 text-center border-2 border-dashed border-gray-200"
          >
            <div className="w-24 h-24 bg-white rounded-[32px] shadow-sm border border-gray-100 flex items-center justify-center text-gray-200 mx-auto mb-8">
              <Ticket size={48} />
            </div>
            <h2 className="text-2xl font-black text-gray-900">No coupons found</h2>
            <p className="text-gray-500 mt-2 font-medium">Keep an eye out! We release new discounts regularly.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coupons.map((coupon) => (
              <CouponCard key={coupon._id} coupon={coupon} />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Floating Info Banner */}
      <div className="mt-20 p-8 rounded-[40px] bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Ticket size={120} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h4 className="text-2xl font-black mb-2 flex items-center gap-3">
              <AlertCircle className="text-pink-400" />
              How to use?
            </h4>
            <p className="text-gray-400 font-medium text-sm">
              Simply copy the code of the coupon you'd like to use and paste it into the "Apply Coupon" field during checkout. 
              Only one coupon can be applied per order.
            </p>
          </div>
          <button className="bg-white text-black px-10 py-5 rounded-2xl font-black hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105 shadow-xl">
            Start Shopping Now
          </button>
        </div>
      </div>
    </div>
  );
}
