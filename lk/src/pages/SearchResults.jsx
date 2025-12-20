import { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API } from "../pages/api";
import CartContext from "../context/CartContext";
import toast from "react-hot-toast";

const FALLBACK_IMAGE =
  "https://via.placeholder.com/400x500?text=No+Image";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addItem } = useContext(CartContext);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/search?q=${query}`);
        setProducts(res.data || []);
      } catch (err) {
        toast("Failed to load search results", {
          style: {
            background: "#7dd3fc",
            color: "#0f172a",
            borderRadius: "9999px",
            padding: "10px 22px",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  const handleAdd = (product) => {
    addItem({ ...product, quantity: 1 });

    toast("Added to cart", {
      style: {
        background: "#7dd3fc",
        color: "#0f172a",
        borderRadius: "9999px",
        padding: "10px 22px",
        fontWeight: "500",
      },
    });
  };

  if (loading) {
    return (
      <div className="p-10 mx-auto text-center text-gray-500 max-w-7xl">
        Loading products…
      </div>
    );
  }

  return (
    <div className="px-6 py-10 mx-auto max-w-7xl">
      {/* HEADER */}
      <h1 className="mb-10 text-2xl font-semibold">
        Results for “{query}”
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4">
          {products.map((item) => (
            <div key={item._id} className="group">
              {/* IMAGE */}
              <div className="relative overflow-hidden bg-gray-100 rounded-xl">
                <Link to={`/product/${item._id}`}>
                  <img
                    src={item.image || FALLBACK_IMAGE}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = FALLBACK_IMAGE;
                    }}
                    className="
                      w-full h-[360px]
                      object-cover
                      transition-transform duration-500
                      group-hover:scale-105
                    "
                  />
                </Link>

                {/* ADD TO CART BUTTON */}
                <button
                  onClick={() => handleAdd(item)}
                  className="absolute px-6 py-2 text-sm font-semibold text-white transition duration-300 -translate-x-1/2 bg-black rounded-full opacity-0  bottom-6 left-1/2 group-hover:opacity-100"
                >
                  ADD TO CART
                </button>
              </div>

              {/* PRODUCT INFO */}
              <div className="mt-4 space-y-1">
                <p className="text-sm font-medium leading-snug line-clamp-2">
                  {item.name}
                </p>

                {/* BRAND (STATIC FOR NOW – OPTIONAL) */}
                <p className="text-xs text-gray-500">
                  Marketzen
                </p>

                <p className="text-sm font-semibold">
                  ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
