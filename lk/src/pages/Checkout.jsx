// import { useContext, useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import CartContext from "../context/CartContext";
// import { API } from "../pages/api";
// import toast from "react-hot-toast";

// export default function Checkout() {
//   const { cart, clearCart } = useContext(CartContext);
//   const navigate = useNavigate();

//   const userId = localStorage.getItem("userId");

//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [isPlacingOrder, setIsPlacingOrder] = useState(false);

//   // ----------------------------------
//   // LOAD ADDRESS BOOK
//   // ----------------------------------
//   useEffect(() => {
//     if (!userId) return;

//     fetch(`${API}/address/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setAddresses(data || []);
//         const def = data?.find((a) => a.isDefault);
//         if (def) setSelectedAddress(def);
//       })
//       .catch(() => {
//         toast("Failed to load addresses");
//       });
//   }, [userId]);

//   // Redirect if cart empty
//   useEffect(() => {
//     if (cart.length === 0) navigate("/");
//   }, [cart, navigate]);

//   const total = cart.reduce(
//     (sum, item) => sum + Number(item.price) * Number(item.quantity),
//     0
//   );

//   // ----------------------------------
//   // PLACE ORDER
//   // ----------------------------------
//   const placeOrder = async () => {
//     if (!selectedAddress) {
//       toast("Please select a delivery address", {
//         style: {
//           background: "#111",
//           color: "#fff",
//           borderRadius: "10px",
//         },
//       });
//       return;
//     }

//     setIsPlacingOrder(true);

//     try {
//       await fetch(`${API}/orders`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userId,
//           items: cart,
//           address: selectedAddress, // SNAPSHOT
//           total,
//         }),
//       });

//       clearCart();

//       toast("Order placed successfully", {
//         style: {
//           background: "#111",
//           color: "#fff",
//           borderRadius: "10px",
//         },
//       });

//       navigate("/order-success");
//     } catch (err) {
//       toast("Checkout failed. Try again.");
//     } finally {
//       setIsPlacingOrder(false);
//     }
//   };

//   return (
//     <div className="max-w-6xl px-6 py-12 mx-auto">
//       <h1 className="mb-10 text-4xl font-bold">Checkout</h1>

//       <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
//         {/* ---------------------------------- */}
//         {/* ADDRESS SELECTION */}
//         {/* ---------------------------------- */}
//         <div className="p-6 border lg:col-span-2 rounded-xl">
//           <h2 className="mb-6 text-2xl font-semibold">
//             Select Delivery Address
//           </h2>

//           {addresses.length === 0 && (
//             <p className="mb-4 text-gray-600">
//               No saved addresses found.
//             </p>
//           )}

//           <div className="space-y-4">
//             {addresses.map((addr) => (
//               <div
//                 key={addr._id}
//                 onClick={() => setSelectedAddress(addr)}
//                 className={`p-4 border rounded-lg cursor-pointer transition ${
//                   selectedAddress?._id === addr._id
//                     ? "border-black bg-gray-50"
//                     : "hover:shadow-sm"
//                 }`}
//               >
//                 <div className="flex items-center justify-between">
//                   <p className="font-semibold">{addr.fullName}</p>
//                   {addr.isDefault && (
//                     <span className="text-xs font-medium text-green-600">
//                       DEFAULT
//                     </span>
//                   )}
//                 </div>

//                 <p className="mt-1 text-sm text-gray-600">
//                   {addr.street}, {addr.city}, {addr.state} – {addr.pincode}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   Phone: {addr.phone}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <button
//             onClick={() => navigate("/add-address")}
//             className="mt-6 text-sm text-blue-600 hover:underline"
//           >
//             + Add New Address
//           </button>
//         </div>

//         {/* ---------------------------------- */}
//         {/* ORDER SUMMARY */}
//         {/* ---------------------------------- */}
//         <div className="p-6 border rounded-xl h-fit">
//           <h2 className="mb-6 text-2xl font-semibold">
//             Order Summary
//           </h2>

//           {cart.map((item) => (
//             <div
//               key={item._id}
//               className="flex justify-between mb-3 text-sm"
//             >
//               <span>
//                 {item.title} × {item.quantity}
//               </span>
//               <span>
//                 ₹{item.price * item.quantity}
//               </span>
//             </div>
//           ))}

//           <hr className="my-4" />

//           <div className="flex justify-between mb-6 text-lg font-semibold">
//             <span>Total</span>
//             <span>₹{total}</span>
//           </div>

//           <button
//             onClick={placeOrder}
//             disabled={isPlacingOrder}
//             className="w-full py-3 text-white bg-black rounded-full hover:bg-gray-800 disabled:opacity-50"
//           >
//             {isPlacingOrder ? "Placing Order..." : "Place Order"}
//           </button>

//           <Link
//             to="/cart"
//             className="block mt-4 text-sm text-center text-gray-500 hover:underline"
//           >
//             Back to Cart
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

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

  // ----------------------------------
  // PLACE ORDER
  // ----------------------------------
  const placeOrder = async () => {
    if (!selectedAddress) {
      toast("Please select a delivery address", {
        style: { background: "#111", color: "#fff" },
      });
      return;
    }

    setIsPlacingOrder(true);

    try {
      await API.post("/orders", {
        items: cart,
        address: selectedAddress, // snapshot
        total,
      });

      clearCart();

      toast("Order placed successfully", {
        style: { background: "#111", color: "#fff" },
      });

      navigate("/order-success");
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      toast("Checkout failed. Try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="max-w-6xl px-6 py-12 mx-auto">
      <h1 className="mb-10 text-4xl font-bold">Checkout</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* ---------------------------------- */}
        {/* ADDRESS SELECTION */}
        {/* ---------------------------------- */}
        <div className="p-6 border lg:col-span-2 rounded-xl">
          <h2 className="mb-6 text-2xl font-semibold">
            Select Delivery Address
          </h2>

          {loadingAddresses && (
            <p className="text-gray-500">Loading addresses...</p>
          )}

          {!loadingAddresses && addresses.length === 0 && (
            <p className="mb-4 text-gray-600">
              No saved addresses found.
            </p>
          )}

          <div className="space-y-4">
            {addresses.map((addr) => (
              <div
                key={addr._id}
                onClick={() => setSelectedAddress(addr)}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  selectedAddress?._id === addr._id
                    ? "border-black bg-gray-50"
                    : "hover:shadow-sm"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{addr.fullName}</p>
                  {addr.isDefault && (
                    <span className="text-xs font-medium text-green-600">
                      DEFAULT
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm text-gray-600">
                  {addr.street}, {addr.city}, {addr.state} – {addr.pincode}
                </p>
                <p className="text-sm text-gray-600">
                  Phone: {addr.phone}
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/add-address")}
            className="mt-6 text-sm text-blue-600 cursor-pointer hover:underline"
          >
            + Add New Address
          </button>
        </div>

        {/* ---------------------------------- */}
        {/* ORDER SUMMARY */}
        {/* ---------------------------------- */}
        <div className="p-6 border rounded-xl h-fit">
          <h2 className="mb-6 text-2xl font-semibold">
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between mb-3 text-sm"
            >
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}

          <hr className="my-4" />

          <div className="flex justify-between mb-6 text-lg font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            disabled={isPlacingOrder}
            className="w-full py-3 text-white bg-black rounded-full cursor-pointer hover:bg-gray-800 disabled:opacity-50"
          >
            {isPlacingOrder ? "Placing Order..." : "Place Order"}
          </button>

          <Link
            to="/cart"
            className="block mt-4 text-sm text-center text-gray-500 hover:underline"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
