import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { API } from "../pages/api.jsx";
import CartContext from "../context/CartContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [username, setUsername] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { clearCart } = useContext(CartContext);

  const typingDelay = useRef(null);
  const dropdownRef = useRef(null);

  /* ---------------- LOAD USER ---------------- */
  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  /* ---------------- CLOSE DROPDOWN ---------------- */
  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  /* ---------------- LOGOUT ---------------- */
  const handleLogout = () => {
    clearCart();
    localStorage.clear();
    setUsername(null);
    setMenuOpen(false);
    navigate("/");
  };

  /* ---------------- SEARCH ---------------- */
  const handleSearch = (value) => {
    setSearchValue(value);
    setShowDropdown(true);

    if (typingDelay.current) clearTimeout(typingDelay.current);

    typingDelay.current = setTimeout(async () => {
      if (!value.trim()) {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      try {
        const res = await API.get(`/products/search?q=${value}`);
        setResults(res.data.slice(0, 6));
      } catch (err) {
        console.log("Search Error:", err);
      }
    }, 300);
  };

  return (
    <div className="sticky top-0 z-50 border-b bg-white/70 backdrop-blur-xl">

      {/* ================= ROW 1 : MAIN HEADER ================= */}
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-pink-600">
          Marketzen
        </Link>

        {/* SEARCH */}
        <div
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
          className="relative w-1/2"
        >
          <div className="flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus-within:shadow-md">
            <FaSearch className="text-sm text-gray-400" />
            <input
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchValue.trim()) {
                  navigate(`/search?q=${searchValue}`);
                  setShowDropdown(false);
                }
              }}
              placeholder="Search for products, brands & more"
              className="w-full text-sm bg-transparent outline-none"
              onFocus={() => setShowDropdown(true)}
            />
          </div>

          {/* SEARCH DROPDOWN */}
          {showDropdown && results.length > 0 && (
            <div className="absolute z-50 w-full mt-3 overflow-hidden bg-white shadow-xl rounded-xl">
              {results.map((item) => (
                <Link
                  to={`/product/${item._id}`}
                  key={item._id}
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-10 h-10 bg-gray-100 rounded"
                  />
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">₹{item.price}</p>
                  </div>
                </Link>
              ))}

              <div
                onClick={() => {
                  navigate(`/search?q=${searchValue}`);
                  setShowDropdown(false);
                }}
                className="px-5 py-4 text-sm font-semibold text-center text-blue-600 cursor-pointer hover:bg-gray-50"
              >
                View all results for “{searchValue}”
              </div>
            </div>
          )}
        </div>

        {/* USER + CART */}
        <div className="flex items-center gap-6 text-sm">
          {/* <Link to="/seller-login" className="font-semibold text-blue-600">
            Seller Login
          </Link> */}

          {username ? (
            <span onClick={handleLogout} className="cursor-pointer">
              👤 {username}
            </span>
          ) : (
            <Link to="/login" className="flex items-center gap-2">
              <FaUser /> Login
            </Link>
          )}

          <Link to="/cart" className="flex items-center gap-2">
            <FaShoppingCart /> Cart
          </Link>
        </div>
      </div>

      {/* ================= ROW 2 : CATEGORIES ================= */}
      <div className="bg-white border-t">
        <div className="flex gap-8 px-4 py-3 mx-auto overflow-x-auto font-medium text-gray-700 max-w-7xl whitespace-nowrap">
          {/* <Link to="/category/whats-new">What's New</Link> */}
          <Link to="/category/makeup">Makeup</Link>
          <Link to="/category/skin">Skin</Link>
          <Link to="/category/hair">Hair</Link>
          <Link to="/category/fragrance">Fragrance</Link>
          <Link to="/category/men">Men</Link>
          <Link to="/category/bath-body">Bath & Body</Link>
          <Link to="/category/tools">Tools</Link>
          <Link to="/category/mom-baby">Mom & Baby</Link>
          <Link to="/category/wellness">Wellness</Link>
          <Link to="/category/minis">Minis</Link>
          <Link to="/category/gifts">Gifts</Link>
        </div>
      </div>

      {/* ================= ROW 3 : NAVBAR FOOTER (NEW) ================= */}
      <div className="border-t bg-gray-50">
        <div className="flex flex-col gap-3 px-4 py-4 mx-auto text-xs text-gray-600 max-w-7xl md:flex-row md:items-center md:justify-between">

          <p>
            © {new Date().getFullYear()} Marketzen. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-black">Privacy</Link>
            <Link to="/terms" className="hover:text-black">Terms</Link>
            <Link to="/contact" className="hover:text-black">Contact</Link>
            <span className="text-gray-400">Secure Payments • Easy Returns</span>
          </div>

        </div>
      </div>

    </div>
  );
}
