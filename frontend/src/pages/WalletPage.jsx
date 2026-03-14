import React from "react";
import { 
  CreditCard, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  PieChart,
  ShieldCheck,
  Gift,
  Zap,
  ChevronRight,
  PlusCircle
} from "lucide-react";
import { motion } from "framer-motion";

const PaymentMethod = ({ brand, last4, type, primary }) => (
  <div className={`p-6 rounded-[32px] border ${primary ? 'border-pink-100 bg-pink-50/30' : 'border-gray-100 bg-white'} flex items-center justify-between group cursor-pointer hover:shadow-md transition-all`}>
    <div className="flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm ${primary ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
        <CreditCard size={24} />
      </div>
      <div>
        <p className="font-black text-gray-900 tracking-tight">{brand} •••• {last4}</p>
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{type} {primary && "• Primary"}</p>
      </div>
    </div>
    <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-pink-600 group-hover:border-pink-200 transition-all">
      <ChevronRight size={16} />
    </div>
  </div>
);

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight mb-2 uppercase tracking-widest">Digital Wallet</h1>
            <p className="text-sm text-gray-400 font-black uppercase tracking-[0.2em]">Manage payments and credits</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Card Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Balance Card */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gray-900 rounded-[48px] p-10 text-white relative overflow-hidden shadow-2xl shadow-gray-200"
            >
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <PieChart size={180} />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-pink-600 rounded-xl">
                        <Plus size={20} className="text-white" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-pink-500">Available Credits</span>
                </div>
                
                <p className="text-6xl font-black tracking-tight mb-4">₹2,450.00</p>
                <div className="flex gap-4">
                    <button className="px-8 py-3 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all">Add Funds</button>
                    <button className="px-8 py-3 bg-white/10 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest border border-white/10 hover:bg-white/20 transition-all">Transfer</button>
                </div>
              </div>
            </motion.div>

            {/* Methods */}
            <section>
                <div className="flex items-center justify-between mb-6 px-4">
                    <h2 className="text-lg font-black text-gray-900 tracking-tight uppercase tracking-wider">Payment Methods</h2>
                    <button className="text-xs font-black text-pink-600 flex items-center gap-2 hover:underline">
                        <PlusCircle size={16} /> ADD METHOD
                    </button>
                </div>
                <div className="space-y-4">
                    <PaymentMethod brand="Visa" last4="8812" type="Debit Card" primary />
                    <PaymentMethod brand="Mastercard" last4="4029" type="Credit Card" />
                </div>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            
            <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden">
                <Gift className="absolute -right-10 -bottom-10 text-orange-500/10" size={120} />
                <h3 className="text-xl font-black mb-2 tracking-tight">Redeem Gift Card</h3>
                <p className="text-sm text-gray-500 font-medium mb-6">Enter your 16-digit code to add credit instantly.</p>
                <div className="flex gap-2">
                    <input type="text" placeholder="XXXX-XXXX-XXXX" className="flex-grow p-4 rounded-2xl bg-gray-50 border border-gray-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all" />
                    <button className="p-4 bg-orange-500 text-white rounded-2xl hover:bg-orange-600 transition-all">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="p-8 bg-blue-600 rounded-[40px] text-white">
                <ShieldCheck size={32} className="mb-4 text-blue-200" />
                <h3 className="text-xl font-black mb-2">Secure Payments</h3>
                <p className="text-sm text-blue-100 font-medium leading-relaxed">
                    Your financial data is protected by bank-level encryption and 24/7 fraud monitoring systems.
                </p>
            </div>

            <div className="p-8 bg-white border border-gray-100 rounded-[40px] shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <History className="text-gray-400" size={20} />
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Quick History</span>
                </div>
                <div className="space-y-4">
                    {[
                        { label: 'Netflix Sub', amount: -649, date: '12 MAR' },
                        { label: 'Marketzen Refund', amount: 1200, date: '10 MAR' }
                    ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-bold text-gray-800">{item.label}</p>
                                <p className="text-[10px] font-black text-gray-400">{item.date}</p>
                            </div>
                            <p className={`text-sm font-black ${item.amount > 0 ? 'text-green-500' : 'text-gray-900'}`}>
                                {item.amount > 0 ? '+' : ''}₹{Math.abs(item.amount)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper icons not imported
const History = ({ size, className }) => <Zap size={size} className={className} />;
