import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API } from "../pages/api";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";
import { FaChevronRight } from "react-icons/fa";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/search?q=${query}`);
        setProducts(res.data || []);
      } catch (err) {
        toast.error("Failed to load search results");
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-12 h-12 border-4 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin"></div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Scouring the Collection...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-gray-400">
          <Link to="/" className="hover:text-[#FBCFE8] transition-colors">Home</Link>
          <FaChevronRight size={8} className="opacity-50" />
          <span className="text-gray-900">Boutique Search</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* HEADER */}
        <div className="mb-20 space-y-6">
          <div className="flex items-center gap-4">
             <div className="h-px w-12 bg-[#FBCFE8]" />
             <p className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-[0.4em]">Curated Discovery</p>
          </div>
          <h1 className="text-5xl lg:text-6xl text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Results for: <span className="italic">"{query}"</span>
          </h1>
          <p className="text-gray-400 text-sm font-light tracking-wide italic max-w-xl">
            Refining our global collection to present only the treasures that match your unique search.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-32 space-y-8 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
            <div className="text-gray-300 flex justify-center">
               <FaChevronRight size={40} className="rotate-90 opacity-20" />
            </div>
            <p className="text-gray-400 text-lg font-light italic">Alas, this specific treasure remains elusive.</p>
            <Link to="/" className="inline-block px-12 py-5 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all hover:bg-[#C9A84C] shadow-2xl">Return to Gallery</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-20">
            {products.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
