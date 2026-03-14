import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";
import { API } from "../pages/api.jsx";
import CartContext from "../context/CartContext.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isAiSearch, setIsAiSearch] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const { cartItems } = useContext(CartContext);
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const navLinks = [
    { name: "Makeup", path: "/category/makeup" },
    { name: "Skin", path: "/category/skin" },
    { name: "Hair", path: "/category/hair" },
    { name: "Fragrance", path: "/category/fragrance" },
    { name: "Men", path: "/category/men" },
    { name: "Bath & Body", path: "/category/bath-body" },
    { name: "Tools", path: "/category/tools" },
    { name: "Mom & Baby", path: "/category/mom-baby" },
    { name: "Wellness", path: "/category/wellness" },
    { name: "Minis", path: "/category/minis" },
    { name: "Skin AI", path: "/skin-analyzer" },
    { name: "Routine", path: "/routine-builder" },
    { name: "Safe Beauty", path: "/ingredient-checker" },
    { name: "Gifts", path: "/category/gifts" },
  ];

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const endpoint = isAiSearch ? `/api/ai/smart-search?q=${searchQuery}` : `/products/search?q=${searchQuery}`;
          const res = await API.get(endpoint);
          setSearchResults(res.data);
          setShowSearch(true);
        } catch (err) {
          console.error("Search error:", err);
        }
      } else {
        setSearchResults([]);
        setShowSearch(false);
      }
    };

    const timer = setTimeout(handleSearch, isAiSearch ? 800 : 300);
    return () => clearTimeout(timer);
  }, [searchQuery, isAiSearch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
      {/* TOP HEADER */}
      <div className="h-[80px]">
        <div className="flex items-center justify-between h-full px-6 mx-auto max-w-7xl">

          {/* LEFT: PREMIUM LOGO */}
          <div className="flex items-center h-full min-w-[200px]">
            <Link to="/" className="flex items-center gap-4 group transition-all duration-500">
              <div className="relative">
                <img 
                  src={logo} 
                  alt="MarketZen Icon" 
                  className="h-10 w-10 object-contain transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-[#EC4899]/5 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              <div className="flex flex-col leading-none">
                <h1 className="text-2xl tracking-tight flex items-center" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <span className="font-normal text-slate-900 uppercase">Market</span>
                  <span className="font-medium italic text-[#C9A84C] ml-1">Zen</span>
                </h1>
                <p className="text-[7px] font-bold text-[#FBCFE8] tracking-[0.4em] mt-2 uppercase leading-none">
                  Shop Smarter. Live Calmer.
                </p>
              </div>
            </Link>
          </div>

            <div className="relative flex justify-center flex-1 max-w-2xl px-10" ref={searchRef}>
              <div className="flex flex-col w-full gap-2">
                <div className="relative w-full group">
                  <input
                    type="text"
                    placeholder={isAiSearch ? "Ask AI: 'Find a gift under ₹1000'..." : "Search beauty, skin & more..."}
                    className={`w-full h-11 px-12 py-2 text-sm text-slate-900 transition-all bg-gray-50 border rounded-full focus:outline-none focus:bg-white focus:ring-4 placeholder:text-gray-400 ${
                      isAiSearch 
                        ? "border-[#EC4899]/30 focus:border-[#EC4899]/60 focus:ring-[#EC4899]/5" 
                        : "border-gray-100 focus:border-[#C9A84C]/40 focus:ring-[#C9A84C]/5"
                    }`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <FaSearch className={`absolute -translate-y-1/2 left-5 top-1/2 transition-colors ${
                    isAiSearch ? "text-[#EC4899]" : "text-gray-400 group-focus-within:text-[#C9A84C]"
                  }`} />
                  
                  <button 
                    onClick={() => setIsAiSearch(!isAiSearch)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all ${
                      isAiSearch ? "bg-[#EC4899] text-white shadow-lg" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {isAiSearch ? "✨ AI ON" : "✨ AI OFF"}
                  </button>
                </div>
                {isAiSearch && (
                  <div className="flex justify-center gap-6">
                    <Link to="/skin-analyzer" className="text-[9px] font-bold text-[#EC4899] uppercase tracking-widest hover:underline animate-pulse">
                      ✨ AI Skin Analyzer
                    </Link>
                    <Link to="/routine-builder" className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-widest hover:underline">
                      ✨ Routine Builder
                    </Link>
                    <Link to="/ingredient-checker" className="text-[9px] font-bold text-[#EC4899] uppercase tracking-widest hover:underline">
                      ✨ Ingredient Checker
                    </Link>
                  </div>
                )}
              </div>

            {showSearch && (
              <div className="absolute left-0 right-0 z-[100] p-2 mt-2 bg-white border border-gray-100 shadow-2xl top-full rounded-2xl backdrop-blur-xl mx-8">
                {searchResults.length > 0 ? (
                  searchResults.slice(0, 5).map((product) => (
                    <button
                      key={product._id}
                      onClick={() => {
                        navigate(`/product/${product._id}`);
                        setShowSearch(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center w-full gap-4 p-3 transition-all rounded-xl hover:bg-gray-50 group text-left"
                    >
                      <img src={product.image} className="w-12 h-12 object-cover rounded-lg border border-gray-100" alt="" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 group-hover:text-[#EC4899] transition-colors line-clamp-1">{product.name}</p>
                        <p className="text-xs text-slate-500">₹{product.price}</p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center text-sm text-gray-400 italic font-medium">
                    No products found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: USER & CART */}
          <div className="flex items-center gap-8 min-w-[200px] justify-end">
            {username ? (
              <div className="relative group">
                <button className="flex items-center gap-3 text-slate-800 hover:text-[#C9A84C] transition-all group-hover:scale-[1.02]">
                  <div className="w-10 h-10 rounded-[14px] bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden transition-all shadow-lg ring-1 ring-white/10">
                    <FaUser className="text-[#C9A84C] text-sm" />
                  </div>
                  <div className="hidden lg:flex flex-col items-start leading-none translate-y-[1px]">
                    <span className="text-[9px] font-bold text-[#FBCFE8] uppercase tracking-[0.2em] mb-1">Authenticated</span>
                    <span className="text-xs font-medium tracking-tight" style={{ fontFamily: "'Jost', sans-serif" }}>{username}</span>
                  </div>
                </button>
                <div className="absolute right-0 w-64 mt-4 transition-all opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 z-[100] scale-95 group-hover:scale-100 origin-top-right">
                  <div className="overflow-hidden bg-white/80 backdrop-blur-2xl border border-white/40 rounded-3xl shadow-[0_30px_100px_-15px_rgba(0,0,0,0.15)] p-2 ring-1 ring-black/[0.03]">
                    {role === "admin" && (
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-[11px] text-[#EC4899] font-bold hover:bg-[#EC4899]/5 rounded-2xl transition-all border-b border-gray-100/50 mb-1 uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-pulse" />
                        Admin Sanctuary
                      </Link>
                    )}
                    
                    {/* Activity Section */}
                    <div className="px-2 py-2">
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] px-3 mb-2">Member Services</p>
                      <Link to="/profile" className="block px-4 py-2.5 text-xs text-slate-600 hover:bg-[#C9A84C]/5 hover:text-[#C9A84C] rounded-xl transition-all font-medium">Personal Profile</Link>
                      <Link to="/orders" className="block px-4 py-2.5 text-xs text-slate-600 hover:bg-[#C9A84C]/5 hover:text-[#C9A84C] rounded-xl transition-all font-medium">Order Archives</Link>
                      <Link to="/wishlist" className="block px-4 py-2.5 text-xs text-slate-600 hover:bg-[#C9A84C]/5 hover:text-[#C9A84C] rounded-xl transition-all font-medium">Curated Desires</Link>
                    </div>

                    <div className="px-2 py-2 border-t border-gray-100/50">
                      <p className="text-[8px] font-bold text-gray-400 uppercase tracking-[0.3em] px-3 mb-2">Ecosystem</p>
                      <Link to="/addresses" className="block px-4 py-2.5 text-xs text-slate-600 hover:bg-[#C9A84C]/5 hover:text-[#C9A84C] rounded-xl transition-all font-medium">Saved Destinations</Link>
                    </div>

                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 mt-2 text-[10px] font-bold text-red-400 hover:bg-red-50 hover:text-red-500 rounded-2xl transition-all uppercase tracking-widest">Sign Out</button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/login" className="px-6 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-black hover:scale-105 shadow-xl shadow-slate-200">
                Join / Sign In
              </Link>
            )}

            <Link to="/cart" className="relative group">
              <div className="p-2.5 transition-all rounded-full bg-gray-50 text-[#C9A84C] group-hover:scale-110 group-hover:bg-[#C9A84C]/10 border border-gray-100">
                <FaShoppingCart className="text-lg" />
                {cartItems && cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1 text-[9px] font-bold text-white bg-[#EC4899] rounded-full ring-2 ring-white shadow-lg">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>

            <button className="p-2 md:hidden text-slate-900 group" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="w-6 h-0.5 bg-slate-900 mb-1.5 transition-all group-hover:w-4"></div>
              <div className="w-4 h-0.5 bg-slate-900 mb-1.5 transition-all group-hover:w-6"></div>
              <div className="w-6 h-0.5 bg-slate-900 transition-all group-hover:w-5"></div>
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM NAV */}
      <div className="hidden md:block bg-white border-t border-gray-50 py-1">
        <div className="flex items-center justify-center h-12 px-4 mx-auto max-w-7xl">
          <ul className="flex items-center gap-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="relative py-3 text-[10px] font-bold tracking-[0.25em] text-slate-500 uppercase transition-all duration-300 hover:text-slate-900 group"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {link.name}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#C9A84C] transition-all duration-300 group-hover:w-1/2"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-[85%] bg-white shadow-2xl overflow-y-auto">
            <div className="flex flex-col h-full p-8 relative">
              <button 
                className="absolute top-6 right-8 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-slate-900 text-xl border border-gray-100 hover:bg-[#FBCFE8]/20 transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              > 
                ✕ 
              </button>
              
              <div className="mt-16 space-y-12">
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-[0.4em] ml-2">MarketZen Boutique</p>
                  <h2 className="text-4xl text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>Navigation</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="group flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-[#FBCFE8]/10 transition-all"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-lg font-light tracking-wide text-slate-800 group-hover:text-[#C9A84C]" style={{ fontFamily: "'Jost', sans-serif" }}>
                        {link.name}
                      </span>
                      <FaChevronRight size={10} className="text-gray-300 group-hover:text-[#C9A84C] transition-colors" />
                    </Link>
                  ))}
                </div>

                <div className="pt-8 border-t border-gray-100 space-y-4">
                   {!username && (
                     <Link 
                      to="/login" 
                      className="block w-full text-center py-5 bg-slate-900 text-white rounded-3xl text-sm font-bold uppercase tracking-widest shadow-xl"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Authenticate Access
                    </Link>
                   )}
                   <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest">Shop Smarter • Live Calmer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
