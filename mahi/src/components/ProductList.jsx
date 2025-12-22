import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../pages/api.jsx";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  // Convert slug → Proper Name
  const formattedName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // ================================
  // CATEGORY SPECIFIC DETAILS
  // ================================
  const categoryInfo = {
    hair: {
      title: "Hair Care Essentials",
      description:
        "Explore shampoos, conditioners, oils & treatments for strong, healthy, beautiful hair.",
      banner:
        "https://images.unsplash.com/photo-1501621667575-af81f1f0bacc?auto=format&fit=crop&w=1400&q=80",
    },

    skin: {
      title: "Skin Care Essentials",
      description:
        "Moisturizers, serums, sunscreens, cleansers — everything you need for glowing skin.",
      banner:
        "https://images.unsplash.com/photo-1500839458577-5d1c1e1bf4b2?auto=format&fit=crop&w=1400&q=80",
    },

    makeup: {
      title: "Makeup Collection",
      description:
        "High-quality foundations, lipsticks, palettes, and more from top brands.",
      banner:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1400&q=80",
    },

    fragrance: {
      title: "Fragrance Selection",
      description: "Perfumes, mists, and long-lasting scents selected for you.",
      banner:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
    },

    men: {
      title: "Men's Grooming",
      description:
        "Beard oils, shaving kits, perfumes, and grooming essentials for men.",
      banner:
        "https://images.unsplash.com/photo-1578932750294-f5075e85da06?auto=format&fit=crop&w=1400&q=80",
    },

    wellness: {
      title: "Wellness Products",
      description:
        "Health supplements, hygiene essentials, detox products & more for complete wellness.",
      banner:
        "https://images.unsplash.com/photo-1599058917212-d750089bc07d?auto=format&fit=crop&w=1400&q=80",
    },

    // Add more categories anytime ↓
  };

  // Use default fallback if category doesn't exist
  const info = categoryInfo[slug] || {
    title: formattedName,
    description: `Showing products for ${formattedName}`,
    banner: null,
  };

  // ================================
  // FETCH PRODUCTS FOR CATEGORY
  // ================================
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get(`/products/category/${slug}`);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
  }, [slug]);

  return (
    <div className="px-6 py-10 mx-auto max-w-7xl">

      {/* CATEGORY BANNER */}
      {info.banner && (
        <img
          src={info.banner}
          alt={info.title}
          className="object-cover w-full h-64 mb-10 shadow rounded-xl"
        />
      )}

      {/* CATEGORY TITLE */}
      <h1 className="text-4xl font-bold">{info.title}</h1>
      <p className="mt-2 text-gray-600">{info.description}</p>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-2 gap-6 mt-10 md:grid-cols-4">
        {products.length === 0 && (
          <p className="text-gray-500 col-span-full">
            No products found in this category.
          </p>
        )}

        {products.map((item) => (
          <div
            key={item._id}
            className="p-4 transition bg-white border rounded-lg shadow-sm hover:shadow-lg"
          >
            <img
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-40 rounded"
            />

            <h2 className="mt-2 font-semibold">{item.name}</h2>
            <p className="mt-1 font-bold text-blue -600">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

