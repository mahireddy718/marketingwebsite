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

  const { clearCart, cart } = useContext(CartContext);

  const typingDelay = useRef(null);
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  /* ---------------- LOAD USER ---------------- */
  useEffect(() => {
    const stored = localStorage.getItem("username");
    if (stored) setUsername(stored);
  }, []);

  /* ---------------- CLOSE DROPDOWN ---------------- */
  useEffect(() => {
    const close = (e) => {
      // if click is inside search dropdown or menu, don't close
      if (dropdownRef.current && dropdownRef.current.contains(e.target)) return;
      if (menuRef.current && menuRef.current.contains(e.target)) return;
      setShowDropdown(false);
      setMenuOpen(false);
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
    <div className="sticky top-0 z-50">

      {/* TOP THIN BAR (optional) */}
      {/*
      <div className="bg-white border-b">
        <div className="flex justify-end px-4 py-2 mx-auto text-sm text-gray-600 max-w-7xl">
          <a href="#" className="mr-6 hover:text-black">Track Order</a>
          <a href="#" className="hover:text-black">Help Centre</a>
        </div>
      </div>
      */}

      {/* ================= ROW 1 : MAIN HEADER ================= */}
      <div className="border-b bg-white/95 backdrop-blur-md h-[2cm]">
        <div className="flex items-center justify-between h-full px-4 mx-auto max-w-7xl">

          {/* LEFT: LOGO */}
          <div className="flex items-center h-full gap-4">
            <Link to="/" className="text-2xl font-bold text-pink-600"> Marketzen </Link> </div>

          {/* CENTER: SEARCH */}
          <div className="flex justify-center flex-1">
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

              {showDropdown && results.length > 0 && (
                <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden bg-white shadow-xl rounded-xl">
                  {results.map((item) => (
                    <Link
                      to={`/product/${item._id}`}
                      key={item._id}
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50"
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
                    className="px-5 py-3 text-sm font-semibold text-center text-blue-600 cursor-pointer hover:bg-gray-50"
                  >
                    View all results for “{searchValue}”
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: ICONS */}
          <div className="flex items-center gap-2">
            {username ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((s) => !s)}
                  className="flex items-center gap-3"
                  title="Account"
                >
                  <span className="text-sm font-medium text-gray-800">{username}</span>
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 w-40 mt-2 bg-white border rounded shadow-md">
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-sm text-left hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <Link to="/login" title="Login">
                  <span className="p-1.5 rounded-full bg-orange-50">
                    <FaUser className="text-orange-500" />
                  </span>
                </Link>
              </div>
            )}

            <div className="relative">
              <Link to="/cart" title="Cart">
                <span className="p-1.5 rounded-full bg-white/5">
                  <FaShoppingCart className="text-gray-800" />
                </span>
              </Link>
              {cart && cart.length > 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-orange-500 rounded-full -top-1 -right-1 ring-2 ring-white">{cart.length}</span>
              )}
            </div>
          </div>
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

     
      {/* <div className="border-t bg-gray-50">
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
      </div> */}

    </div>
  );
}
