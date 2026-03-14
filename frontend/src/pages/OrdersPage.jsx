import { useEffect, useState } from "react";
import { API } from "./api.jsx";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock, ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const StatusBadge = ({ status }) => {
  const styles = {
    PLACED: "bg-slate-50 text-slate-500 border-slate-100",
    PAID: "bg-[#FBCFE8]/10 text-[#FBCFE8] border-[#FBCFE8]/20",
    SHIPPED: "bg-[#C9A84C]/10 text-[#C9A84C] border-[#C9A84C]/20",
    DELIVERED: "bg-green-50 text-green-600 border-green-100",
    CANCELLED: "bg-red-50 text-red-500 border-red-100",
  };

  const icons = {
    PLACED: <Clock size={12} />,
    PAID: <CheckCircle size={12} />,
    SHIPPED: <Truck size={12} />,
    DELIVERED: <CheckCircle size={12} />,
    CANCELLED: <Package size={12} />,
  };

  return (
    <span className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-bold border uppercase tracking-widest ${styles[status] || styles.PLACED}`}>
      {icons[status] || icons.PLACED}
      {status}
    </span>
  );
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-[#C9A84C] border-t-transparent"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
        <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center text-gray-200 mb-8">
          <ShoppingBag size={32} />
        </div>
        <h2 className="text-3xl font-light text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Your collection is empty</h2>
        <p className="text-sm text-gray-400 mt-2 max-w-sm font-medium leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
          You haven't added any masterpieces to your repertoire yet. Discover our curated shop today.
        </p>
        <Link 
          to="/" 
          className="mt-10 bg-slate-900 text-white px-10 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-slate-200"
        >
          Begin Discovery
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-16">
          <h1 className="text-5xl font-light text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Order History</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-4">Tracking your curated treasures</p>
        </div>

        <div className="space-y-12">
          {orders.map((order, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              key={order._id}
              className="group bg-white rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] transition-all duration-700"
            >
              {/* Header: Pure Luxury Look */}
              <div className="p-8 border-b border-gray-50 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-[#FBCFE8]/10 transition-colors duration-500">
                    <Package size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold">Boutique ID</p>
                       <div className="h-px w-4 bg-gray-100" />
                    </div>
                    <p className="text-sm font-bold text-slate-800 tracking-tight uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>ZEN-{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                  <div className="hidden sm:block">
                     <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold text-right mb-1">Date</p>
                     <p className="text-sm font-bold text-slate-800" style={{ fontFamily: "'Jost', sans-serif" }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-1">Status</p>
                    <div className="mt-1">
                      <StatusBadge status={order.status} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Selection Details */}
              <div className="p-8 bg-gray-50/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0 bg-white shadow-sm">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-[11px] font-bold text-slate-800 uppercase tracking-tight truncate" style={{ fontFamily: "'Jost', sans-serif" }}>{item.name}</h4>
                          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-medium">Quantity: {item.quantity}</p>
                          <p className="text-xs font-bold text-[#C9A84C] mt-1 tracking-tight">₹{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="md:border-l md:border-gray-50 md:pl-8 flex flex-col justify-center">
                    <div className="mb-4">
                       <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-2">Destination</p>
                       <div className="flex items-start gap-2">
                         <Truck size={14} className="text-[#C9A84C] mt-0.5" />
                         <p className="text-sm font-medium text-slate-600 leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
                           {order.address.fullName}<br />
                           {order.address.city}, {order.address.state}
                         </p>
                       </div>
                    </div>
                    <div className="pt-4 border-t border-gray-50">
                       <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] font-bold mb-1">Total Valuation</p>
                       <p className="text-3xl font-normal text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>₹{order.total}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* View Link */}
              <Link 
                to={`/orders/${order._id}`} 
                className="flex items-center justify-center gap-3 p-5 bg-white text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] hover:text-slate-900 hover:bg-gray-50 transition-all border-t border-gray-50 group"
              >
                Inspection Details <ChevronRight size={14} className="transition-transform group-hover:translate-x-2 text-[#C9A84C]" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
