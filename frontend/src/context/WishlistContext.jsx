import { createContext, useState, useEffect, useContext } from "react";
import { API } from "../pages/api.jsx";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = async () => {
    if (!localStorage.getItem("token")) return;
    setLoading(true);
    try {
      const res = await API.get("/wishlist");
      setWishlist(res.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId) => {
    if (!localStorage.getItem("token")) {
      toast.error("Please login to use Wishlist");
      return;
    }

    try {
      const res = await API.post("/wishlist/toggle", { productId });
      if (res.data.added) {
        toast.success("Added to wishlist");
      } else {
        toast.success("Removed from wishlist");
      }
      fetchWishlist();
    } catch (err) {
      toast.error("Failed to update wishlist");
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist, loading, fetchWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
export default WishlistContext;
