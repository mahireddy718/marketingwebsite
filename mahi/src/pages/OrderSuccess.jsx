import { useLocation, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { state } = useLocation();

  return (
    <div className="p-10 text-center text-blue">
      <h1 className="mb-4 text-3xl font-bold">Order Placed Successfully 🎉</h1>

      <p className="mb-2 text-lg">Order ID: <b>{state?.orderId}</b></p>
      <p className="mb-6 text-lg">Total: ₹ {state?.total}</p>

      <Link
        to="/"
        className="px-6 py-3 text-white bg-purple-600 rounded hover:bg-purple-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
