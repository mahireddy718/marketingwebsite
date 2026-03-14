import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "./api.jsx";
import { motion } from "framer-motion";
import { 
  Package, 
  MapPin, 
  Calendar, 
  CheckCircle, 
  ArrowLeft, 
  CreditCard,
  Truck,
  Clock,
  ExternalLink
} from "lucide-react";

const StatusStep = ({ icon: Icon, label, date, active, completed }) => (
  <div className="flex flex-col items-center text-center relative z-10">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
      completed ? 'bg-green-500 text-white shadow-lg shadow-green-100' : 
      active ? 'bg-black text-white shadow-lg shadow-gray-200 animate-pulse' : 
      'bg-gray-100 text-gray-400'
    }`}>
      <Icon size={20} />
    </div>
    <div className="mt-4">
      <p className={`text-xs font-bold uppercase tracking-wider ${active || completed ? 'text-gray-900' : 'text-gray-400'}`}>
        {label}
      </p>
      {date && <p className="text-[10px] text-gray-500 mt-1">{date}</p>}
    </div>
  </div>
);

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await API.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold">Order not found</h2>
        <Link to="/orders" className="text-pink-600 font-bold mt-4 inline-block">Back to My Orders</Link>
      </div>
    );
  }

  const steps = [
    { label: "Placed", icon: Package, completed: true, date: new Date(order.createdAt).toLocaleDateString() },
    { label: "Paid", icon: CreditCard, completed: order.status !== "PLACED", date: order.status !== "PLACED" ? "Instant" : null },
    { label: "Shipped", icon: Truck, active: order.status === "SHIPPED", completed: order.status === "DELIVERED" },
    { label: "Delivered", icon: CheckCircle, active: order.status === "DELIVERED", completed: order.status === "DELIVERED" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link 
        to="/orders" 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-10 font-bold text-sm transition-colors group"
      >
        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
        Back to Orders
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Order Details</h1>
            <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              {order.status}
            </span>
          </div>
          <p className="text-gray-500 font-medium">Order ID: <span className="text-gray-900">#{order._id.toUpperCase()}</span></p>
        </div>
        <div className="bg-white px-6 py-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
          <Calendar className="text-pink-500" size={20} />
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Date Placed</p>
            <p className="text-sm font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="bg-white p-12 rounded-[40px] border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
        <div className="relative flex justify-between">
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-100 z-0">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: order.status === "DELIVERED" ? "100%" : order.status === "SHIPPED" ? "75%" : "25%" }}
              className="h-full bg-green-500 transition-all duration-1000"
            />
          </div>
          {steps.map((step, i) => (
            <StatusStep key={i} {...step} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Items Section */}
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden text-sm">
             <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/30">
               <h3 className="font-black uppercase tracking-widest text-gray-400 text-xs">Items ({order.items.length})</h3>
             </div>
             <div className="p-8 space-y-8">
               {order.items.map((item, i) => (
                 <div key={i} className="flex gap-6 group">
                   <div className="w-24 h-24 bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex-shrink-0">
                     <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <h4 className="text-lg font-bold text-gray-900 group-hover:text-pink-600 transition-colors">{item.name}</h4>
                     <p className="text-gray-500 mt-1 font-medium">{item.brand || "Premium Brand"}</p>
                     <p className="text-gray-400 mt-2 text-xs">Quantity: <span className="text-gray-900 font-bold">{item.quantity}</span></p>
                   </div>
                   <div className="text-right">
                     <p className="text-lg font-black text-gray-900">₹{item.price}</p>
                     <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Net Price</p>
                   </div>
                 </div>
               ))}
             </div>
             <div className="px-8 py-8 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
               <p className="text-gray-500 font-bold">Estimated Delivery</p>
               <p className="text-gray-900 font-black flex items-center gap-2">
                 <Truck size={16} className="text-pink-500" />
                 Ready to Ship
               </p>
             </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Shipping Address */}
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Shipping To</h3>
             </div>
             <div className="space-y-1">
               <p className="font-black text-lg text-gray-900">{order.address.fullName}</p>
               <p className="text-gray-500 font-medium leading-relaxed">
                 {order.address.street},<br />
                 {order.address.city}, {order.address.state},<br />
                 {order.address.pincode}
               </p>
               <p className="text-gray-900 font-bold mt-4 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500" />
                 {order.address.phone}
               </p>
             </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-900 text-white p-8 rounded-[40px] shadow-xl shadow-gray-200">
             <h3 className="font-bold mb-6 flex items-center gap-3">
               <CreditCard size={20} className="text-pink-400" />
               Payment Summary
             </h3>
             <div className="space-y-4">
               <div className="flex justify-between text-sm text-gray-400 font-medium">
                 <span>Subtotal</span>
                 <span className="text-white">₹{order.total}</span>
               </div>
               <div className="flex justify-between text-sm text-gray-400 font-medium">
                 <span>Shipping</span>
                 <span className="text-green-400">FREE</span>
               </div>
               <div className="flex justify-between text-sm text-gray-400 font-medium">
                 <span>Tax</span>
                 <span className="text-white">Included</span>
               </div>
               <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                 <div>
                   <p className="text-[10px] text-pink-400 font-black uppercase tracking-widest leading-none mb-1">Grand Total</p>
                   <p className="text-2xl font-black">₹{order.total}</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mb-1">Status</p>
                    <p className="text-xs font-black text-green-400 uppercase italic">Secured</p>
                 </div>
               </div>
             </div>
          </div>

          <button className="w-full bg-white border border-gray-100 p-6 rounded-[40px] font-bold text-gray-600 hover:text-black hover:border-gray-300 transition-all flex items-center justify-center gap-2 shadow-sm">
            <ExternalLink size={16} />
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
