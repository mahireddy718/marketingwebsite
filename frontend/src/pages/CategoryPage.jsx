import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../pages/api.jsx";
import ProductCard from "../components/ProductCard";
import { FaChevronRight } from "react-icons/fa";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formattedName = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const categoryInfo = {
    hair: {
      title: "Hair Care Essentials",
      description: "Explore shampoos, conditioners, oils & treatments for strong, healthy hair.",
      banner: "https://img.freepik.com/free-vector/realistic-curls-female-hair-poster-with-shiny-sparkles-blonde-coils-with-text-cosmetic-products-vector-illustration_1284-82382.jpg",
    },
    skin: {
      title: "Skin Care Essentials",
      description: "Moisturizers, serums, sunscreens, cleansers for glowing skin.",
      banner: "https://lewisiawellness.com/wp-content/uploads/elementor/thumbs/Lewisia-Wellness-Banner-1600-x-500-px-rbdct12a20msbmdyl5mwz6k0ms25w14w1nktpj34e8.png",
    },
    makeup: {
      title: "Makeup Collection",
      description: "Foundations, lipsticks, palettes, and more from top brands.",
      gifs: [
        "https://cdn.prod.website-files.com/61c44817190504d47e91cbc4/68a30873ae20130ac82f1c2d_zodiac%20k%20beauty%20cover.gif",
        "https://cdn.prod.website-files.com/61c44817190504d47e91cbc4/68bb142b2a2cbffcb49b2295_IMG_0710-ezgif.com-optimize%203.gif",
        "https://cdn.prod.website-files.com/61c44817190504d47e91cbc4/68c27c3c1b04fb73dc6554e9_Top%20Shelf_10%20Serum_V02%20cover.gif",
      ],
    },
    gifts: {
      title: "Gift Sets & Hampers",
      description: "Curated gift boxes perfect for every occasion.",
      banner: "https://cms-artifacts.motionarray.com/content/motion-array/777716/Banner_Of_Christmas_Gifts_high_resolution_preview_777716.jpg?Expires=2076859575&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=s42jyppPjmT1gqAbc58eI9zi2xZ-7zgplR18AD-EJftXveIBg25UdLPluZ3j7HAHOiWn4fa8wJCO7zwilprWWzjRfEUdv2OjIL5AbRqxIeh-8VO4yCMAPaGSmDRzGdIDJ9IS0D8rx29x4wk~cAYT38XShN5xSYi99q3xlAkDbcpr2JPR~cAWpyOCV9Jypfvp5ebMZ1zjisnJZcjMGtQgbq2V20MXqmRShW7rt0uguZIRwZyHotlt4jaQwU0S7H6o5kf3XIzNz4gKkkWGGf9IydjkLb-ODvEaNLzZUHLXaw~rah1csce2Ff9foBBKVt8knKteteUv5neALDdlhe2Szw__",
    },
    fragrance: {
      title: "Fragrance Selection",
      description: "Perfumes and long-lasting scents selected for you.",
      banner: "https://t3.ftcdn.net/jpg/02/29/85/80/360_F_229858067_J6fMtf7Pa2qFvdu1p843OrtePu1fR4pb.jpg",
    },
    men: {
      title: "Men's Grooming",
      description: "Beard oils, shaving kits, perfumes, and grooming essentials.",
      banner: "https://admin.indianchemist.com/Attatchments/Category/a77be6ea-9a33-49a2-9dfc-c8960ec5f2c4.png",
    },
    "bath-body": {
      title: "Bath & Body",
      description: "Body washes, scrubs, lotions, soaps and everyday self-care essentials.",
      banner: "https://www.bathandbodyworks.com.au/on/demandware.static/-/Sites-bbw-aus-Library/default/dw53fed4dc/blogs/details/GME-GIpage-AU.jpg",
    },
    "mom-baby": {
      title: "Mom & Baby Care",
      description: "Gentle, safe and nourishing products for mothers and babies.",
      banner: "https://www.omorfee.in/cdn/shop/files/Collection_banner_Baby_3840x1140_crop_center.jpg?v=1749572994",
    },
    minis: {
      title: "Mini & Travel Sizes",
      description: "Compact, travel-friendly versions of your favorite products.",
      banner: "https://www.ada-shop.com/pub/media/catalog/category/Category-banner-travel-essentials.jpg",
    },
    wellness: {
      title: "Wellness Essentials",
      description: "Self-care, relaxation, and wellness products for a balanced lifestyle.",
      banner: "https://www.shutterstock.com/image-photo/banner-word-wellness-africanamerican-woman-260nw-2466442847.jpg",
    },
    tools: {
      title: "Beauty Tools & Accessories",
      description: "Professional beauty tools designed for precision and daily use.",
      banner: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1600&q=80",
    },
  };

  const info = categoryInfo[slug] || {
    title: formattedName,
    description: `Showing products for ${formattedName}`,
    banner: null,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/products?category=${slug}`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-12 h-12 border-4 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin"></div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">Curating for you...</p>
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
          <span className="text-gray-900">{info.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Banner or GIFs */}
        {info.gifs ? (
          <div className="grid grid-cols-1 gap-10 mb-24 md:grid-cols-3">
            {info.gifs.map((g, i) => (
              <div key={i} className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-black/5 border border-gray-100 group">
                <img src={g} alt={`${info.title} ${i + 1}`} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/20 to-transparent h-24" />
              </div>
            ))}
          </div>
        ) : (
          info.banner && (
            <div className="relative h-[480px] mb-24 overflow-hidden rounded-[3rem] shadow-2xl shadow-black/5 border border-gray-100 group">
              <img src={info.banner} alt={info.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-[4s]" />
              <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
            </div>
          )
        )}

        {/* Title Section */}
        <div className="mb-20 space-y-6">
          <div className="flex items-center gap-4">
             <div className="h-px w-12 bg-[#FBCFE8]" />
             <p className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-[0.4em]">Curated Collection</p>
          </div>
          <h1 className="text-5xl lg:text-6xl text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            {info.title}
          </h1>
          <p className="text-gray-400 text-sm font-light tracking-wide lg:max-w-xl italic">
            {info.description}
          </p>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-32 space-y-8 bg-gray-50/50 rounded-[3rem] border border-dashed border-gray-200">
            <div className="text-gray-300 flex justify-center">
               <FaChevronRight size={40} className="rotate-90 opacity-20" />
            </div>
            <p className="text-gray-400 text-lg font-light italic">Our curators are currently selecting new treasures for this collection.</p>
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
