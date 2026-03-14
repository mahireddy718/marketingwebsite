import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart, Trash2, Heart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartContext from "../context/CartContext";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, loading } = useWishlist();
  const { addItem } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addItem({ ...product, quantity: 1 });
    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center text-pink-500 mb-6">
          <Heart size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Your wishlist is empty</h2>
        <p className="text-gray-500 mt-4 max-w-md">
          Save items that you love in your wishlist for later. They will show up here so you can buy them easily.
        </p>
        <Link 
          to="/" 
          className="mt-8 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-2"
        >
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-baseline justify-between mb-16">
          <div>
            <h1 className="text-5xl font-light text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Curated Desires</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-4">{wishlist.length} Treasures Awaiting Acquisition</p>
          </div>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 px-6 text-center">
            <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center text-gray-200 mb-8 border border-gray-50">
              <Heart size={32} strokeWidth={1} />
            </div>
            <h2 className="text-3xl font-light text-slate-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Your collection is a blank canvas</h2>
            <p className="text-sm text-gray-400 max-w-sm font-medium leading-relaxed" style={{ fontFamily: "'Jost', sans-serif" }}>
              Save the masterpieces that resonate with you. They will be curated here for your eventual acquisition.
            </p>
            <Link 
              to="/" 
              className="mt-10 bg-slate-900 text-white px-10 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-black transition-all shadow-2xl shadow-slate-200"
            >
              Begin Discovery
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {wishlist.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={product._id}
                className="group relative bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all duration-700"
              >
                {/* Image Section */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md text-red-400 rounded-full hover:bg-white hover:text-red-600 shadow-xl transition-all duration-300 transform group-hover:scale-110"
                    title="Remove from desires"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                       <p className="text-[9px] font-bold text-[#C9A84C] uppercase tracking-widest leading-none">{product.category}</p>
                       <div className="h-px w-4 bg-[#FBCFE8]/30" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-tight line-clamp-1 mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>{product.name}</h3>
                    <p className="text-lg font-normal text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>₹{product.price}</p>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 hover:bg-black group/btn shadow-xl shadow-slate-100"
                  >
                    <ShoppingCart size={14} className="transition-transform group-hover/btn:rotate-12" />
                    Secure Treasure
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
