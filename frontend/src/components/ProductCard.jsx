import { useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import toast from "react-hot-toast";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";

function ProductCard({ product, p }) {
  const rawItem = product || p || {};
  const { addItem } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useWishlist();

  const item = {
    _id: rawItem._id || rawItem.id,
    name: rawItem.name,
    price: rawItem.price,
    image: rawItem.image,
    brand: rawItem.brand,
    category: rawItem.category,
    quantity: 1,
  };

  const isFavorite = isInWishlist(item._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(item);
    toast.success("Exclusive addition to your selection");
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(item._id);
  };

  return (
    <Link 
      to={`/product/${item._id}`} 
      className="group block bg-white"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-black/5">
        <img
          src={item.image}
          alt={item.name}
          className="object-cover w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Wishlist Button (Signature Light to Dark Pink & Gold) */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 z-10 ${
            isFavorite ? "bg-[#EC4899] scale-110 shadow-[#EC4899]/40" : "bg-[#FBCFE8] scale-100 hover:scale-110"
          }`}
        >
          <FaHeart 
            size={16} 
            className="transition-all duration-500"
            fill={isFavorite ? "#C9A84C" : "white"} 
            stroke={isFavorite ? "#C9A84C" : "white"}
            strokeWidth={isFavorite ? 0 : 2} 
          />
        </button>

        {/* Quick Add Button (Desktop Overlay) */}
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden lg:block">
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-black py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <FaShoppingCart size={11} />
            Add to Selection
          </button>
        </div>
      </div>

      <div className="mt-5 space-y-1.5 px-1 pb-4">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-[#FBCFE8] uppercase tracking-[0.2em]">
            {item.brand || "Elite Collection"}
          </p>
          <div className="flex text-[#C9A84C] gap-0.5">
            <FaStar size={8} />
            <span className="text-[8px] font-bold text-gray-400 leading-none ml-1">4.8</span>
          </div>
        </div>
        
        <h3 className="text-sm lg:text-base text-slate-900 group-hover:text-[#FBCFE8] transition-colors leading-snug line-clamp-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          {item.name}
        </h3>
        
        <div className="flex items-center gap-2 pt-1">
          <span className="text-base font-medium text-slate-900" style={{ fontFamily: "'Jost', sans-serif" }}>₹{item.price}</span>
          <span className="text-[10px] text-gray-400 line-through opacity-70">₹{Math.round(item.price * 1.2)}</span>
        </div>

        {/* Mobile Add to Selection Button (Visible outside image) */}
        <div className="pt-3 block lg:hidden">
          <button
            onClick={handleAddToCart}
            className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.15em] flex items-center justify-center gap-2 active:bg-[#FBCFE8] transition-colors shadow-lg"
          >
            <FaShoppingCart size={10} />
            Add to Selection
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
