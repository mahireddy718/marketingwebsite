import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { API } from "../pages/api.jsx";
import CartContext from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { FaShoppingCart, FaHeart, FaChevronRight, FaStar, FaShieldAlt, FaTruck, FaUndo } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [aiSummary, setAiSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  
  // Shade Finder State
  const [shadeImage, setShadeImage] = useState(null);
  const [shadeResult, setShadeResult] = useState(null);
  const [isFindingShade, setIsFindingShade] = useState(false);

  const { addItem } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products/${id}`);
        setProduct(res.data);
        
        // Fetch AI Summary
        setIsSummarizing(true);
        API.get(`/api/ai/summarize-reviews/${id}`)
          .then(summaryRes => setAiSummary(summaryRes.data.summary))
          .catch(err => console.error("Summary error:", err))
          .finally(() => setIsSummarizing(false));

      } catch (err) {
        console.log(err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({ ...product, quantity });
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    toggleWishlist(product._id);
  };

  const handleShadeAnalysis = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsFindingShade(true);
      const formData = new FormData();
      formData.append("image", file);
      formData.append("productId", id);

      const res = await API.post("/api/ai/find-shade", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setShadeResult(res.data);
      toast.success("Perfect shade matched!");
    } catch (err) {
      console.error(err);
      toast.error("Color match failed. Try better lighting.");
    } finally {
      setIsFindingShade(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-medium text-gray-400">Product not found</h2>
        <Link to="/" className="text-[#C9A84C] hover:underline uppercase tracking-widest text-sm">Return Home</Link>
      </div>
    );
  }

  const isFavorite = isInWishlist(product._id);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-gray-400">
          <Link to="/" className="hover:text-[#FBCFE8] transition-colors">Home</Link>
          <FaChevronRight size={8} className="opacity-50" />
          <Link to={`/category/${product.category}`} className="hover:text-[#FBCFE8] transition-colors">{product.category}</Link>
          <FaChevronRight size={8} className="opacity-50" />
          <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* IMAGE SECTION */}
          <div className="lg:col-span-7 group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-50 shadow-2xl shadow-black/5 border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <button 
                onClick={handleToggleWishlist}
                className={`absolute top-6 right-6 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl z-20 ${
                  isFavorite ? "bg-[#EC4899] scale-110 shadow-[#EC4899]/40" : "bg-[#FBCFE8] scale-100 hover:scale-110"
                }`}
              >
                <FaHeart 
                  size={24} 
                  className="transition-all duration-500"
                  fill={isFavorite ? "#C9A84C" : "white"} 
                  stroke={isFavorite ? "#C9A84C" : "white"}
                  strokeWidth={isFavorite ? 0 : 2.5} 
                />
              </button>
            </div>
          </div>

          {/* DETAILS SECTION */}
          <div className="lg:col-span-5 flex flex-col pt-4">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-[#C9A84C] gap-0.5">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={12} fill={i < 4 ? "currentColor" : "none"} stroke="currentColor" />)}
                </div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">(4.8 / 112 Reviews)</span>
              </div>

              <h1 className="text-4xl lg:text-5xl leading-tight text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                {product.name}
              </h1>
              
              <p className="text-[11px] font-bold text-[#FBCFE8] uppercase tracking-[0.4em]">
                {product.brand || "MarketZen Elite Selection"}
              </p>

              <div className="flex items-baseline gap-4 mt-8">
                <span className="text-4xl font-light text-slate-900" style={{ fontFamily: "'Jost', sans-serif" }}>₹{product.price}</span>
                <span className="text-lg text-gray-300 line-through">₹{Math.round(product.price * 1.2)}</span>
                <span className="text-xs font-bold text-green-500 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-tighter">Save 20%</span>
              </div>

              <div className="h-[1px] w-full bg-gray-100 my-10" />

              <p className="text-slate-600 leading-relaxed text-sm font-light tracking-wide lg:max-w-md" style={{ fontFamily: "'Jost', sans-serif" }}>
                {product.description || "Indulge in the purest luxury. This meticulously crafted formulation blends ancient wisdom with modern science to deliver unparalleled results."}
              </p>

              {/* AI SUMMARY BOX */}
              <div className="mt-8 relative group">
                <div className="absolute inset-x-0 -inset-y-2 bg-gradient-to-r from-[#FBCFE8]/10 via-transparent to-[#FBCFE8]/5 blur-xl group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/40 backdrop-blur-sm border border-gray-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#EC4899]/10 flex items-center justify-center text-[#EC4899]">
                      <FaStar size={12} className="animate-pulse" />
                    </div>
                    <span className="text-[9px] font-bold text-slate-900 uppercase tracking-[0.3em]">AI Sentiment Insight</span>
                  </div>
                  
                  {isSummarizing ? (
                    <div className="flex items-center gap-3 py-2">
                      <div className="w-3 h-3 border-2 border-[#EC4899]/20 border-t-[#EC4899] rounded-full animate-spin" />
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest animate-pulse">Distilling reviews...</span>
                    </div>
                  ) : (
                    <p className="text-[12px] text-slate-600 leading-relaxed font-light italic">
                      "{aiSummary || "Be the first to leave a review and unlock our AI sentiment analysis for this artisan selection."}"
                    </p>
                  )}
                </div>
              </div>

              {/* SHADE FINDER SECTION (Only for Makeup/Skin) */}
              {(product.category === "makeup" || product.category === "skin") && (
                <div className="mt-8 p-8 border border-[#C9A84C]/20 bg-[#C9A84C]/5 rounded-[2.5rem] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">Hues Intelligence</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Find your perfect match via AI vision</p>
                    </div>
                    <label className="cursor-pointer bg-slate-900 text-white px-6 py-3 rounded-full text-[9px] font-bold uppercase tracking-widest hover:bg-[#C9A84C] transition-colors">
                      {isFindingShade ? "Analyzing..." : "Find My Shade"}
                      <input type="file" className="hidden" accept="image/*" onChange={handleShadeAnalysis} />
                    </label>
                  </div>
                  
                  {shadeResult && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6"
                    >
                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FBCFE8] to-[#C9A84C] flex items-center justify-center text-white font-bold text-xs shadow-lg">
                         {shadeResult.confidence}%
                       </div>
                       <div className="flex-1">
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Recommended Shade</p>
                          <p className="text-sm font-bold text-slate-900">{shadeResult.shadeMatch}</p>
                          <p className="text-[11px] text-slate-500 italic mt-1">"{shadeResult.advice}"</p>
                       </div>
                    </motion.div>
                  )}
                </div>
              )}

              <div className="space-y-8 mt-12">
                {/* Quantity & Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
                  <div className="flex items-center justify-between border border-gray-200 rounded-full px-6 py-4 sm:w-40 bg-gray-50/50">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-slate-400 hover:text-slate-900 transition-colors">
                      <span className="text-xl">−</span>
                    </button>
                    <span className="font-bold text-slate-900 text-lg">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="text-slate-400 hover:text-slate-900 transition-colors">
                      <span className="text-xl">+</span>
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-slate-900 text-white rounded-full py-5 px-10 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-[#0D0D0D] hover:shadow-2xl hover:shadow-[#FBCFE8]/20 flex items-center justify-center gap-4 group"
                  >
                    <FaShoppingCart className="group-hover:scale-110 transition-transform" />
                    Add to Collection
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-gray-50">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#C9A84C]">
                      <FaShieldAlt />
                    </div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">100% Authentic</p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#C9A84C]">
                      <FaTruck />
                    </div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Global Express</p>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#C9A84C]">
                      <FaUndo />
                    </div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Luxury Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
