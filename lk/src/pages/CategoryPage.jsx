import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../pages/api.jsx";
import ProductCard from "../components/ProductCard";

export default function CategoryPage() {
  const { slug } = useParams(); // ex: bath-body
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Convert slug to readable title
  const formattedName = slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Category metadata (slug-safe)
  const categoryInfo = {
    hair: {
      title: "Hair Care Essentials",
      description:
        "Explore shampoos, conditioners, oils & treatments for strong, healthy hair.",
      banner:
        "https://img.freepik.com/free-vector/realistic-curls-female-hair-poster-with-shiny-sparkles-blonde-coils-with-text-cosmetic-products-vector-illustration_1284-82382.jpg",
    },
    skin: {
      title: "Skin Care Essentials",
      description:
        "Moisturizers, serums, sunscreens, cleansers for glowing skin.",
      banner:
        "https://lewisiawellness.com/wp-content/uploads/elementor/thumbs/Lewisia-Wellness-Banner-1600-x-500-px-rbdct12a20msbmdyl5mwz6k0ms25w14w1nktpj34e8.png",
    },
    makeup: {
      title: "Makeup Collection",
      description:
        "Foundations, lipsticks, palettes, and more from top brands.",
      banner:
        "https://www.shutterstock.com/image-photo/cheerful-young-woman-white-blouse-260nw-2212525959.jpg",
    },
    gifts: {
    title: "Gift Sets & Hampers",
    description:
      "Curated gift boxes perfect for every occasion.",
    banner:
      "https://cms-artifacts.motionarray.com/content/motion-array/777716/Banner_Of_Christmas_Gifts_high_resolution_preview_777716.jpg?Expires=2076859575&Key-Pair-Id=K2ZDLYDZI2R1DF&Signature=s42jyppPjmT1gqAbc58eI9zi2xZ-7zgplR18AD-EJftXveIBg25UdLPluZ3j7HAHOiWn4fa8wJCO7zwilprWWzjRfEUdv2OjIL5AbRqxIeh-8VO4yCMAPaGSmDRzGdIDJ9IS0D8rx29x4wk~cAYT38XShN5xSYi99q3xlAkDbcpr2JPR~cAWpyOCV9Jypfvp5ebMZ1zjisnJZcjMGtQgbq2V20MXqmRShW7rt0uguZIRwZyHotlt4jaQwU0S7H6o5kf3XIzNz4gKkkWGGf9IydjkLb-ODvEaNLzZUHLXaw~rah1csce2Ff9foBBKVt8knKteteUv5neALDdlhe2Szw__",
  },
    fragrance: {
      title: "Fragrance Selection",
      description: "Perfumes and long-lasting scents selected for you.",
      banner:
        "https://t3.ftcdn.net/jpg/02/29/85/80/360_F_229858067_J6fMtf7Pa2qFvdu1p843OrtePu1fR4pb.jpg",
    },
    men: {
      title: "Men's Grooming",
      description:
        "Beard oils, shaving kits, perfumes, and grooming essentials.",
      banner:
        "https://admin.indianchemist.com/Attatchments/Category/a77be6ea-9a33-49a2-9dfc-c8960ec5f2c4.png",
    },
    "bath-body": {
      title: "Bath & Body",
      description:
        "Body washes, scrubs, lotions, soaps and everyday self-care essentials.",
      banner:
        "https://www.bathandbodyworks.com.au/on/demandware.static/-/Sites-bbw-aus-Library/default/dw53fed4dc/blogs/details/GME-GIpage-AU.jpg",
    },
    "mom-baby": {
      title: "Mom & Baby Care",
      description:
        "Gentle, safe and nourishing products for mothers and babies.",
      banner:
        "https://www.omorfee.in/cdn/shop/files/Collection_banner_Baby_3840x1140_crop_center.jpg?v=1749572994",
    },
      minis: {
    title: "Mini & Travel Sizes",
    description:
      "Compact, travel-friendly versions of your favorite products.",
    banner:
      "https://www.ada-shop.com/pub/media/catalog/category/Category-banner-travel-essentials.jpg",
  }, wellness: {
    title: "Wellness Essentials",
    description:
      "Self-care, relaxation, and wellness products for a balanced lifestyle.",
    banner:
      "https://www.shutterstock.com/image-photo/banner-word-wellness-africanamerican-woman-260nw-2466442847.jpg",
  }, tools: {
    title: "Beauty Tools & Accessories",
    description:
      "Professional beauty tools designed for precision and daily use.",
    banner:
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1600&q=80",
  },
  };

  const info = categoryInfo[slug] || {
    title: formattedName,
    description: `Showing products for ${formattedName}`,
    banner: null,
  };

  // Fetch products by category
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

  return (
    <div className="px-6 py-10 mx-auto max-w-7xl">

      {/* Banner */}
      {info.banner && (
        <img
          src={info.banner}
          alt={info.title}
          className="object-cover w-full h-64 mb-10 rounded-xl"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-semibold tracking-tight">
        {info.title}
      </h1>
      <p className="max-w-2xl mt-2 text-gray-600">
        {info.description}
      </p>

      {/* Content */}
      <div className="grid grid-cols-2 gap-10 mt-12 md:grid-cols-3 lg:grid-cols-4">

        {loading && (
          <p className="text-gray-500 col-span-full">
            Loading products…
          </p>
        )}

        {!loading && products.length === 0 && (
          <p className="text-gray-500 col-span-full">
            No products found in this category.
          </p>
        )}

        {!loading &&
          products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))
        }

      </div>
    </div>
  );
}
