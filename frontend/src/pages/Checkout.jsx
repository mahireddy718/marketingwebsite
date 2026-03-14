import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import CartContext from "../context/CartContext";
import { API } from "../pages/api";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  // ----------------------------------
  // LOAD ADDRESS BOOK (JWT BASED)
  // ----------------------------------
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        const res = await API.get("/api/address");
        setAddresses(res.data || []);

        const def = res.data?.find((a) => a.isDefault);
        if (def) setSelectedAddress(def);
      } catch (err) {
        console.error("Load address error:", err.response?.data || err.message);
        toast("Failed to load addresses");
      } finally {
        setLoadingAddresses(false);
      }
    };

    loadAddresses();
  }, []);

  // Redirect if cart empty
  useEffect(() => {
    if (cart.length === 0) navigate("/");
  }, [cart, navigate]);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isPaying, setIsPaying] = useState(false);

  // ----------------------------------
  // RAZORPAY SCRIPT LOADER
  // ----------------------------------
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ----------------------------------
  // PLACE ORDER / PAY
  // ----------------------------------
  const handlePaymentAndPlaceOrder = async () => {
    if (!selectedAddress) {
      toast("Please select a delivery address", {
        style: { background: "#111", color: "#fff" },
      });
      return;
    }

    if (paymentMethod === "cod") {
      // Handle Cash on Delivery
      setIsPlacingOrder(true);
      try {
        await API.post("/orders", {
          items: cart,
          address: selectedAddress,
          total,
        });
        clearCart();
        toast.success("Order placed (COD)");
        navigate("/order-success");
      } catch (err) {
        toast.error("Failed to place order");
      } finally {
        setIsPlacingOrder(false);
      }
      return;
    }

    // Razorpay Flow
    setIsPaying(true);
    const resScript = await loadRazorpayScript();

    if (!resScript) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      setIsPaying(false);
      return;
    }

    try {
      // 1. Create Order on Backend
      const orderRes = await API.post("/payment/order", { amount: total });
      const { id: order_id, currency, amount: razorpayAmount } = orderRes.data;

      const options = {
        key: "rzp_test_RtAEhhoLIQ49vG", // Public Key (Hardcoded for simplicity, usually from env)
        amount: razorpayAmount,
        currency,
        name: "Marketzen",
        description: "Order Payment",
        order_id,
        handler: async (response) => {
          // 2. Verify Payment on Backend
          try {
            const verifyRes = await API.post("/payment/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: {
                items: cart,
                address: selectedAddress,
                total
              }
            });

            if (verifyRes.status === 200) {
              clearCart();
              toast.success(`Payment Successful! Earned ${verifyRes.data.earnedCoins} coins.`);
              navigate("/order-success");
            }
          } catch (err) {
            console.error("Verification Error:", err);
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: localStorage.getItem("username") || "Customer",
          email: "test@marketzen.com",
          contact: "9999999988", // Use a standard-looking test number
          method: paymentMethod === "upi" ? "upi" : undefined,
        },
        theme: {
          color: "#db2777", // pink-600
        },
        // We'll leave the rest to Razorpay's default intelligent display
        // to ensure maximum compatibility with the test key.
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        toast.error("Payment Failed: " + response.error.description);
      });
    } catch (err) {
      console.error("Razorpay error:", err);
      toast.error("Failed to start payment process.");
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      <div className="max-w-7xl px-6 py-16 mx-auto">
        <h1 className="mb-12 text-5xl font-light text-slate-900 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Checkout</h1>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Checkout Sections */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* 1. Address Selection */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-8 rounded-full bg-[#FBCFE8] flex items-center justify-center text-[10px] font-bold text-white uppercase">01</span>
                <h2 className="text-2xl font-normal text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>Delivery Destination</h2>
              </div>

              {loadingAddresses && (
                <div className="py-10 text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-[#C9A84C] border-t-transparent rounded-full mx-auto" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr._id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-6 border-2 rounded-2xl cursor-pointer transition-all duration-500 relative ${
                      selectedAddress?._id === addr._id
                        ? "border-[#C9A84C] bg-[#C9A84C]/5 ring-1 ring-[#C9A84C]/20"
                        : "border-gray-100 hover:border-[#FBCFE8] bg-gray-50/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                       <p className="font-bold text-sm tracking-tight text-slate-800 uppercase" style={{ fontFamily: "'Jost', sans-serif" }}>{addr.fullName}</p>
                       {addr.isDefault && <span className="text-[8px] font-bold bg-white px-2 py-1 rounded-full border border-gray-100 text-gray-400 uppercase tracking-widest">Active</span>}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {addr.street}, {addr.city}<br />
                      {addr.state} — {addr.pincode}<br />
                      M: {addr.phone}
                    </p>
                    {selectedAddress?._id === addr._id && (
                      <div className="absolute top-4 right-4 text-[#C9A84C]">
                        <div className="w-2 h-2 rounded-full bg-[#C9A84C] animate-pulse" />
                      </div>
                    )}
                  </div>
                ))}
                
                <button
                  onClick={() => navigate("/add-address")}
                  className="p-6 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-[#FBCFE8] hover:border-[#FBCFE8] transition-all group"
                >
                  <span className="text-xl group-hover:scale-125 transition-transform">+</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest">New Address</span>
                </button>
              </div>
            </section>

            {/* 2. Payment Method */}
            <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-8 rounded-full bg-[#FBCFE8] flex items-center justify-center text-[10px] font-bold text-white uppercase">02</span>
                <h2 className="text-2xl font-normal text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>Payment Experience</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { id: "card", label: "Luxury Card", icon: "💳" },
                  { id: "upi", label: "Instant UPI", icon: "📱" },
                  { id: "cod", label: "Boutique COD", icon: "💵" }
                ].map((method) => (
                  <div 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`group p-8 border-2 rounded-3xl cursor-pointer flex flex-col items-center gap-4 transition-all duration-500 ${
                       paymentMethod === method.id 
                        ? "border-[#C9A84C] bg-white shadow-2xl shadow-[#C9A84C]/10 ring-1 ring-[#C9A84C]/20" 
                        : "border-gray-50 bg-gray-50/50 hover:bg-white hover:border-[#FBCFE8]/30"
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all duration-500 ${
                      paymentMethod === method.id ? "bg-[#C9A84C] text-white rotate-[10deg]" : "bg-white text-gray-300 group-hover:bg-[#FBCFE8]/10"
                    }`}>
                       {method.icon}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-center" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {method.label}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-3xl p-10 shadow-[0_30px_70px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-5">
                <h2 className="text-6xl font-bold uppercase rotate-90" style={{ fontFamily: "'Jost', sans-serif" }}>ZEN</h2>
              </div>

              <h2 className="mb-8 text-2xl font-normal text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>Selection Summary</h2>

              <div className="space-y-6 mb-10 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item._id} className="flex items-center gap-5 group">
                    <div className="relative overflow-hidden w-16 h-16 rounded-2xl border border-gray-100 bg-gray-50">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex-1">
                       <p className="font-bold text-[11px] text-slate-800 uppercase tracking-tight line-clamp-1" style={{ fontFamily: "'Jost', sans-serif" }}>{item.name}</p>
                       <p className="text-[10px] text-[#C9A84C] font-bold mt-1 uppercase tracking-widest">{item.quantity} × ₹{item.price}</p>
                    </div>
                    <span className="text-xs font-bold text-slate-900" style={{ fontFamily: "'Jost', sans-serif" }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 py-8 border-t border-gray-50">
                <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                   <span>Initial Total</span>
                   <span className="text-slate-900">₹{total}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                   <span>Boutique Shipping</span>
                   <span className="text-[#FBCFE8]">Complementary</span>
                </div>
                <div className="flex justify-between items-end pt-4 border-t border-gray-50">
                   <div>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Final Amount</p>
                     <span className="text-3xl font-normal text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>₹{total}</span>
                   </div>
                   <div className="text-right">
                      <p className="text-[9px] font-bold text-green-500 uppercase tracking-widest mb-1">+ Zen Coins</p>
                      <p className="text-xs font-bold text-[#C9A84C]">Elite Member</p>
                   </div>
                </div>
              </div>

              <button
                onClick={handlePaymentAndPlaceOrder}
                disabled={isPlacingOrder || isPaying}
                className="w-full mt-10 py-5 text-white bg-slate-900 rounded-2xl cursor-pointer hover:bg-black font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-500 shadow-2xl shadow-slate-200 disabled:opacity-50 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#C9A84C]/0 via-[#C9A84C]/20 to-[#C9A84C]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                {isPaying ? "Processing Payment..." : isPlacingOrder ? "Restocking Inventory..." : `Proceed to Pay ₹${total}`}
              </button>

              <div className="mt-8 flex items-center justify-center gap-3 grayscale opacity-30">
                 <div className="h-4 w-px bg-gray-300" />
                 <span className="text-[8px] font-bold uppercase tracking-widest text-gray-500">Secure SSL Merchant</span>
                 <div className="h-4 w-px bg-gray-300" />
              </div>

              <Link
                to="/cart"
                className="block mt-6 text-[10px] font-bold text-center text-gray-400 uppercase tracking-widest hover:text-[#C9A84C] transition-colors"
              >
                ← Back to Cart Selection
              </Link>
            </div>
          </div>
        </div>
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
