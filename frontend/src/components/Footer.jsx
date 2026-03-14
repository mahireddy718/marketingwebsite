import { Link } from "react-router-dom";
import { FaBriefcase, FaStar, FaGift, FaQuestionCircle, FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-40 bg-slate-900 text-white overflow-hidden relative">
      {/* Aesthetic Top Border */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C9A84C]/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-8">
          
          {/* Brand Vision */}
          <div className="lg:col-span-2 space-y-8 pr-12">
            <div className="space-y-4">
              <h2 className="text-3xl text-white tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Market<span className="text-[#C9A84C] italic">Zen</span>
              </h2>
              <p className="text-[10px] font-bold text-[#FBCFE8] tracking-[0.4em] uppercase">Shop Smarter. Live Calmer.</p>
            </div>
            <p className="text-sm font-light leading-relaxed text-slate-400 max-w-sm italic" style={{ fontFamily: "'Jost', sans-serif" }}>
              Curating the world's most exquisite beauty, skin, and wellness treasures. We believe luxury is found in the calm, and style is an expression of the soul.
            </p>
            <div className="flex gap-6">
               <a href="#" className="h-10 w-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                  <FaStar size={14} />
               </a>
               <a href="#" className="h-10 w-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all">
                  <FaHeart size={14} />
               </a>
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase">The Collection</h3>
            <ul className="space-y-4 text-sm font-light text-slate-400" style={{ fontFamily: "'Jost', sans-serif" }}>
              <li><Link to="/about" className="hover:text-white transition-colors">Elite Story</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Boutique Concierge</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">Curation Careers</Link></li>
              <li><Link to="/stories" className="hover:text-white transition-colors">Zen Journal</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-[10px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase">Member Services</h3>
            <ul className="space-y-4 text-sm font-light text-slate-400" style={{ fontFamily: "'Jost', sans-serif" }}>
              <li><Link to="/payments" className="hover:text-white transition-colors">Payments</Link></li>
              <li><Link to="/shipping" className="hover:text-white transition-colors">Delivery Logistics</Link></li>
              <li><Link to="/returns" className="hover:text-white transition-colors">Exchanges</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Assistance</Link></li>
            </ul>
          </div>

          <div className="space-y-8">
             <h3 className="text-[10px] font-bold tracking-[0.3em] text-[#C9A84C] uppercase">Privacy & Law</h3>
             <ul className="space-y-4 text-sm font-light text-slate-400" style={{ fontFamily: "'Jost', sans-serif" }}>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Charter</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/security" className="hover:text-white transition-colors">Cyber Sanctuary</Link></li>
            </ul>
          </div>

        </div>

        <div className="mt-24 pt-10 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-wrap items-center justify-center gap-10 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <span className="flex items-center gap-3 cursor-pointer hover:text-[#C9A84C] transition-colors"><FaBriefcase /> Partnership</span>
            <span className="flex items-center gap-3 cursor-pointer hover:text-[#C9A84C] transition-colors"><FaStar /> Marketing</span>
            <span className="flex items-center gap-3 cursor-pointer hover:text-[#C9A84C] transition-colors"><FaGift /> Gifting</span>
            <span className="flex items-center gap-3 cursor-pointer hover:text-[#C9A84C] transition-colors"><FaQuestionCircle /> Sanctuary Help</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <p className="text-[10px] font-medium text-slate-500 tracking-widest">© {new Date().getFullYear()} MarketZen International</p>
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="Payments" className="opacity-30 grayscale invert" />
          </div>
        </div>
      </div>
      
      {/* Gradient Decoration */}
      <div className="absolute bottom-0 right-0 w-[30%] h-[30%] bg-[#C9A84C]/5 rounded-full blur-[120px] -mr-[15%] -mb-[15%]" />
    </footer>
  );
}