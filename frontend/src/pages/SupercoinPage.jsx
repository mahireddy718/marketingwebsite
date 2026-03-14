import { useEffect, useState } from "react";
import { API } from "./api.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Coins, 
  TrendingUp, 
  History, 
  Gift, 
  ChevronRight, 
  Zap,
  ShoppingBag,
  Star,
  Info
} from "lucide-react";
import { Link } from "react-router-dom";

const CoinStat = ({ icon: Icon, label, value, color }) => (
  <div className={`bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{label}</p>
      <p className="text-xl font-black text-gray-900">{value}</p>
    </div>
  </div>
);

export default function SupercoinPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, ordersRes] = await Promise.all([
          API.get("/auth/me"),
          API.get("/orders")
        ]);
        setUser(userRes.data);
        setRecentOrders(ordersRes.data.slice(0, 3));
      } catch (err) {
        console.error("Error fetching supercoin data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  const balance = user?.superCoins || 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-[48px] p-12 text-white mb-12 shadow-2xl shadow-gray-200">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Coins size={240} strokeWidth={1} />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-tr from-yellow-400 to-yellow-600 p-2 rounded-xl shadow-lg shadow-yellow-500/20">
                <Coins className="text-white" size={24} />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.2em] text-yellow-500">Supercoins Program</span>
            </div>
            <h1 className="text-6xl font-black tracking-tight mb-4">Your Balance</h1>
            <div className="flex items-end gap-3 mb-8">
              <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200">
                {balance}
              </span>
              <span className="text-2xl font-black text-gray-500 mb-3 tracking-widest uppercase">Coins</span>
            </div>
            <div className="flex gap-4">
              <Link to="/" className="bg-white text-black px-8 py-4 rounded-2xl font-black hover:bg-yellow-400 transition-all flex items-center gap-2 group shadow-xl">
                Earn More Coins
                <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-[40px] p-8 border border-white/10">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Zap size={20} className="text-yellow-400" fill="currentColor" />
              How you earned them
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 flex-shrink-0">
                  <ShoppingBag size={20} />
                </div>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                  You earned <span className="text-white font-bold">{balance} coins</span> by spending over ₹{balance * 1000} on our platform. Keep shopping to grow your balance!
                </p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <Star size={20} />
                </div>
                <p className="text-sm text-gray-400 font-medium leading-relaxed">
                  Earn <span className="text-white font-bold">1 SuperCoin</span> for every <span className="text-white font-bold">₹1000</span> spent. No upper limit on earnings!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <CoinStat 
          icon={TrendingUp} 
          label="Conversion rate" 
          value="₹1000 = 1 Coin" 
          color="bg-green-50 text-green-600" 
        />
        <CoinStat 
          icon={Gift} 
          label="Reward Value" 
          value="Premium Discounts" 
          color="bg-pink-50 text-pink-600" 
        />
        <CoinStat 
          icon={Info} 
          label="Status" 
          value="Silver Member" 
          color="bg-blue-50 text-blue-600" 
        />
      </div>

      {/* Activity Section */}
      <div className="bg-white rounded-[48px] border border-gray-100 shadow-sm p-10 overflow-hidden">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400">
              <History size={24} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Recent Earnings</h2>
          </div>
          <button className="text-sm font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">View All Activity</button>
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {recentOrders.length === 0 ? (
              <div className="py-12 text-center text-gray-400 font-medium">No coin activity yet. Place your first order to start earning!</div>
            ) : (
              recentOrders.map((order, idx) => {
                const earned = Math.floor(order.total / 1000);
                if (earned === 0) return null;
                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={order._id}
                    className="flex items-center justify-between p-6 rounded-[32px] hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-100"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white rounded-2xl border border-gray-100 flex items-center justify-center text-gray-900 group-hover:scale-110 transition-transform shadow-sm">
                        <ShoppingBag size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">Order #{order._id.slice(-6).toUpperCase()}</p>
                        <p className="text-gray-400 text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-green-500">+{earned}</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Coins Added</p>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Perks */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
         <div className="p-10 bg-yellow-400 rounded-[48px] shadow-xl shadow-yellow-100 group hover:-translate-y-1 transition-transform cursor-pointer">
            <h4 className="text-2xl font-black mb-2">Redeem for Discounts</h4>
            <p className="text-black/60 font-medium mb-6">Convert your supercoins into exclusive voucher codes at checkout.</p>
            <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center">
              <ChevronRight size={24} />
            </div>
         </div>
         <div className="p-10 bg-pink-500 rounded-[48px] text-white shadow-xl shadow-pink-100 group hover:-translate-y-1 transition-transform cursor-pointer">
            <h4 className="text-2xl font-black mb-2">Partner Offers</h4>
            <p className="text-white/60 font-medium mb-6">Use coins for subscriptions and premium flight/hotel deals.</p>
            <div className="w-12 h-12 bg-white text-pink-500 rounded-2xl flex items-center justify-center">
              <ChevronRight size={24} />
            </div>
         </div>
      </div>
    </div>
  );
}
