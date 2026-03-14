import { useContext } from "react";
import CartContext from "../context/CartContext.jsx";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

export default function Cart() {
  const { cart, removeFromCart, clearCart, changeQty } = useContext(CartContext);

  const getTotal = () => {
    return cart.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.quantity),
      0
    );
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl px-6 py-16 mx-auto">
        <div className="flex items-baseline justify-between mb-12">
          <h1 className="text-5xl font-light text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Shopping Selection</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">{cart.length} Masterpieces Selected</p>
        </div>

        {cart.length === 0 ? (
          <div className="mt-32 text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-8 text-gray-200">
               <FiShoppingBag size={32} />
            </div>
            <h2 className="mb-4 text-2xl font-normal text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>Your collection is currently empty</h2>
            <p className="text-sm text-gray-400 mb-10 leading-relaxed font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>Discover our curated treasures and start building your personal sanctuary of style.</p>
            <Link
              to="/"
              className="inline-block px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-slate-900 rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200"
            >
              Begin Discovery
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* ITEM LIST */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="group flex flex-col md:flex-row items-center gap-8 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-gray-100 hover:-translate-y-1"
                >
                  <div className="relative w-40 h-40 rounded-2xl overflow-hidden border border-gray-50 bg-gray-50 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                         <h3 className="text-lg font-bold text-slate-800 uppercase tracking-tight mb-2" style={{ fontFamily: "'Jost', sans-serif" }}>{item.name}</h3>
                         <p className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-widest mb-4">MarketZen Original • Ref. {String(item._id || 'UKWN').slice(-5).toUpperCase()}</p>
                      </div>
                      <p className="text-xl font-normal text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>₹{item.price}</p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-gray-50">
                      {/* BOUTIQUE QTY CONTROLS */}
                      <div className="flex items-center gap-6 p-2 bg-gray-50/50 rounded-2xl border border-gray-100">
                        <button
                          onClick={() =>
                            item.quantity > 1
                              ? changeQty(item._id, item.quantity - 1)
                              : removeFromCart(item._id)
                          }
                          className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-400 hover:bg-white hover:text-[#C9A84C] hover:border-[#FBCFE8] hover:shadow-sm transition-all"
                        >
                          —
                        </button>

                        <span className="text-sm font-bold text-slate-800 tracking-tighter w-4 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => changeQty(item._id, item.quantity + 1)}
                          className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-slate-400 hover:bg-white hover:text-[#C9A84C] hover:border-[#FBCFE8] hover:shadow-sm transition-all"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hover:text-red-400 transition-colors"
                      >
                        Release from Selection
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center pt-8">
                <Link to="/" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-slate-900 transition-colors">
                  ← Continue Discovery
                </Link>
                <button
                  onClick={clearCart}
                  className="text-[10px] font-bold text-red-300 uppercase tracking-widest hover:text-red-500 transition-colors"
                >
                  Clear Entire Selection
                </button>
              </div>
            </div>

            {/* SELECTION SUMMARY */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white rounded-3xl p-10 shadow-[0_30px_70px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-5">
                   <h2 className="text-6xl font-bold uppercase rotate-90" style={{ fontFamily: "'Jost', sans-serif" }}>SELECT</h2>
                </div>

                <h2 className="mb-8 text-2xl font-normal text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>Order Analytics</h2>

                <div className="space-y-4 py-8 border-y border-gray-50">
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                     <span>Total Treasures</span>
                     <span className="text-slate-900">{cart.length} Units</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                     <span>Boutique Tax</span>
                     <span className="text-slate-900">₹0.00</span>
                  </div>
                  <div className="flex justify-between items-end pt-4 border-t border-gray-50">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Valuation</p>
                     <p className="text-3xl font-normal text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>₹{getTotal()}</p>
                  </div>
                </div>

                <div className="mt-10 space-y-4">
                  <Link
                    to="/checkout"
                    className="block w-full py-5 text-center text-white bg-slate-900 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-2xl shadow-slate-200 hover:bg-black hover:scale-[1.02]"
                  >
                    Confirm Selection
                  </Link>
                  <p className="text-[9px] text-center text-gray-400 font-medium px-4 leading-relaxed tracking-wide">
                    Finalize your curated collection and proceed to our secure boutique checkout.
                  </p>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-50 flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Shipping</p>
                    <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Complementary</p>
                  </div>
                  <div className="h-6 w-px bg-gray-100" />
                  <div className="text-center">
                    <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-1">Service</p>
                    <p className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-widest">Premium</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #f1f1f1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
