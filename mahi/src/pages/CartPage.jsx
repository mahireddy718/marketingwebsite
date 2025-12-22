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
    <div className="p-6 shadow-lg bg-white/10 backdrop-blur-md rounded-2xl">
    <div className="max-w-6xl p-6 mx-auto">
      <h1 className="mb-6 text-3xl font-bold flex items-center gap-3">
        <span className="p-2 rounded-full bg-white/5">
          <FiShoppingBag className="text-white" size={20} />
        </span>
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="mt-20 text-center">
          <h2 className="mb-4 text-xl font-semibold">Your cart is empty</h2>
          <Link
            to="/"
            className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* LEFT SIDE — CART ITEMS */}
          <div className="md:col-span-2">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 mb-4 bg-white border rounded shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-20 h-20 rounded"
                  />

                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">₹ {item.price}</p>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() =>
                          item.quantity > 1
                            ? changeQty(item._id, item.quantity - 1)
                            : removeFromCart(item._id)
                        }
                        className="flex items-center justify-center w-8 h-8 border rounded cursor-pointer hover:bg-gray-100"
                      >
                        -
                      </button>

                      <span className="px-3 py-1 border rounded">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => changeQty(item._id, item.quantity + 1)}
                        className="flex items-center justify-center w-8 h-8 border rounded cursor-pointer hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="px-3 py-1 text-white bg-red-500 rounded cursor-pointer hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="px-4 py-2 mt-4 text-white bg-red-600 rounded cursor-pointer hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>

          {/* RIGHT SIDE — ORDER SUMMARY */}
          <div className="p-4 bg-white border rounded shadow-sm h-fit">
            <h2 className="mb-3 text-xl font-semibold">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between mb-4 font-medium">
              <span>Total Price:</span>
              <span>₹ {getTotal()}</span>
            </div>

            {/* CHECKOUT BUTTON — FIXED VERSION */}
            <Link
              to="/checkout"
              className="block w-full px-4 py-2 text-center text-white bg-green-600 rounded hover:bg-green-700"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
