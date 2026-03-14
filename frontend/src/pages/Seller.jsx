import React from "react";
import { 
  ShoppingBag, 
  Package, 
  Users, 
  TrendingUp, 
  PlusCircle, 
  ChevronRight, 
  Store,
  BarChart3,
  Globe,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SellerCard = ({ title, icon: Icon, description, to, color }) => (
  <Link to={to} className="group">
    <motion.div 
      whileHover={{ y: -8 }}
      className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all h-full flex flex-col"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${color}`}>
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-black text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 font-medium mb-6 flex-grow leading-relaxed">{description}</p>
      <div className="flex items-center gap-2 text-pink-600 font-black text-xs uppercase tracking-widest">
        Access Now
        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
      </div>
    </motion.div>
  </Link>
);

export default function Seller() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Header */}
        <div className="relative overflow-hidden bg-white/80 backdrop-blur-xl border border-white rounded-[48px] p-12 mb-12 shadow-sm">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-100/20 rounded-full -mr-48 -mt-48 blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-50 text-pink-600 text-[10px] font-black uppercase tracking-widest border border-pink-100 mb-6">
                <Store size={14} /> Partner Portal
              </div>
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 mb-4 leading-tight">Grow your business with Marketzen.</h1>
              <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8">
                The most powerful vendor hub to manage your products, fulfill orders, and reach millions of customers globally.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black shadow-xl shadow-gray-200 hover:bg-black transition-all">GET STARTED</button>
                <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center gap-2">
                  <Globe size={18} /> VIEW MARKETPLACE
                </button>
              </div>
            </div>
            
            <div className="flex-shrink-0 grid grid-cols-2 gap-4">
              <div className="p-6 bg-pink-50 rounded-[32px] text-center">
                <p className="text-3xl font-black text-pink-600">4.8k</p>
                <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest mt-1">Sellers</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-[32px] text-center">
                <p className="text-3xl font-black text-blue-600">1.2M</p>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">Orders</p>
              </div>
              <div className="p-6 bg-orange-50 rounded-[32px] text-center col-span-2">
                <p className="text-3xl font-black text-orange-600">99.9%</p>
                <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mt-1">Fulfillment Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Hub */}
        <h2 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em] mb-8 px-4">Merchant Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SellerCard 
            title="Product Management"
            icon={Package}
            description="Add new inventory, update pricing, and manage stock levels across variants."
            to="/admin/products"
            color="bg-purple-50 text-purple-600"
          />
          <SellerCard 
            title="Order Fulfillment"
            icon={ShoppingBag}
            description="Process incoming orders, manage shipments, and handle returns seamlessly."
            to="/admin/orders"
            color="bg-green-50 text-green-600"
          />
          <SellerCard 
            title="Category Setup"
            icon={PlusCircle}
            description="Organize your store by creating and managing hierarchical categories."
            to="/admin/categories"
            color="bg-orange-50 text-orange-600"
          />
          <SellerCard 
            title="Sales Analytics"
            icon={BarChart3}
            description="Track your revenue trends, customer growth, and top-selling products."
            to="/admin"
            color="bg-blue-50 text-blue-600"
          />
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-10 bg-gradient-to-br from-pink-600 to-rose-600 rounded-[48px] text-white overflow-hidden relative"
          >
            <TrendingUp size={200} className="absolute -bottom-10 -right-10 opacity-10 rotate-12" />
            <h3 className="text-3xl font-black mb-4 relative z-10">Reach 50M+ Customers</h3>
            <p className="text-pink-100 font-medium mb-8 leading-relaxed max-w-md relative z-10">
              Our marketing engine automatically promotes your high-performing products to relevant buyers across the web.
            </p>
            <button className="px-8 py-3 bg-white text-pink-600 rounded-xl font-black text-sm uppercase tracking-wider relative z-10">BOOST SALES</button>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-10 bg-white border border-gray-100 rounded-[48px] shadow-sm relative overflow-hidden"
          >
            <ShieldCheck size={200} className="absolute -bottom-10 -right-10 opacity-5 -rotate-12" />
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Users size={24} />
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">Dedicated Support</h3>
            <p className="text-gray-500 font-medium mb-8 leading-relaxed">
              Every professional seller gets a dedicated account manager and 24/7 technical support for platform integrations.
            </p>
            <button className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-black text-sm uppercase tracking-wider">CONTACT ADVISOR</button>
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest leading-loose">
                Marketzen Merchant Services &copy; 2026 <br/>
                All transactions are secured with 256-bit SSL Encryption
            </p>
        </div>
      </div>
    </div>
  );
}
