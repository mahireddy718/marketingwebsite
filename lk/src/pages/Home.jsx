import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ProductCard from "../components/ProductCard";

export default function Home() {
  const heroSlides = [
    {
      title: "Glazed Skin Goals",
      subtitle: "Up to 15% off",
      desc: "Skin-protecting, dewy formulas from top brands.",
      img: "https://www.hindustantimes.com/ht-img/img/2023/03/14/1600x900/photo_2023-03-14_17-19-42_1678794913310_1678794921097_1678794921097.jpg",
      link: "/category/skin",
    },
    {
      title: "Luxury Makeup Picks",
      subtitle: "Flat 20% Off",
      desc: "Trending essentials you’ll love.",
      img: "https://m.media-amazon.com/images/I/71TtkiOaU7L.jpg",
      link: "/category/makeup",
    },
    {
      title: "Hair Care Boost",
      subtitle: "Strong & Silky",
      desc: "Nourish your hair daily.",
      img: "https://beardo.in/cdn/shop/files/2_3.jpg?v=1762572768&width=1445",
      link: "/category/hair",
    },
    {
      title: "Fragrance Deals",
      subtitle: "Up to 30% Off",
      desc: "Premium perfumes, curated.",
      img: "https://mxp-media.ilnmedia.com/media/content/2025/Oct/Line-it-Shape-it-Own-it_68e28376b048f.jpg",
      link: "/category/fragrance",
    },
    {
      title: "Men Grooming",
      subtitle: "Everyday Essentials",
      desc: "Effortless daily style.",
      img: "https://cdn.i.haymarketmedia.asia/?n=campaign-india%2Fcontent%2Fiframe+width%3D560+height%3D315+src%3Dhttpswww.youtube.comembedEpu3lIByuuksi%3DsLPgApuxv_R3JPJG+title%3DYouTube+video+player+frameborder%3D0+allow%3Daccelerometer%3B+autoplay%3B+clipboard-write%3B+encrypted-media%3B+gy.jpg",
      link: "/category/men",
    },
    {
      title: "Bath & Body",
      subtitle: "Relax & Refresh",
      desc: "Wellness starts here.",
      img: "https://www.bathandbodyworks.in/on/demandware.static/-/Sites-bathandbody_storefront_catalog/default/dw5f8d3c20/QQQ%2030.jpg",
      link: "/category/bath-body",
    },
    {
      title: "Mom & Baby",
      subtitle: "Gentle Care",
      desc: "Safe for everyday use.",
      img: "https://i.pinimg.com/736x/b4/a0/b5/b4a0b55abf5f1019d15db7a2e5ff681a.jpg",
      link: "/category/mom-baby",
    },
    {
      title: "Mini Essentials",
      subtitle: "Travel Friendly",
      desc: "Small size, big impact.",
      img: "https://www.srisritattva.com/cdn/shop/products/MiniEssential.jpg?v=1700222302&width=1445",
      link: "/category/minis",
    },
    {
      title: "Gift Combos",
      subtitle: "Festive Specials",
      desc: "Curated gifting made easy.",
      img: "https://houseofaroma.in/wp-content/uploads/2025/09/Gifts-for-Festivals-3.webp",
      link: "/category/gifts",
    },
  ];

  const deals = [
    {
      id: 1,
      name: "Glow Skin Serum",
      price: 299,
      image: "https://img.freepik.com/premium-vector/cosmetics-skin-care-product-ads-with-bottle-banner-ad-beauty-products-with-paper-art-love_258787-2914.jpg",
    },
    {
      id: 2,
      name: "Hair Strength Oil",
      price: 249,
      image: "https://img.freepik.com/premium-vector/hair-care-products-ad_258787-3104.jpg",
    },
    {
      id: 3,
      name: "Daily Face Wash",
      price: 199,
      image: "https://img.freepik.com/premium-vector/face-wash-ad-banner_258787-3120.jpg",
    },
    {
      id: 4,
      name: "Night Repair Cream",
      price: 349,
      image: "https://img.freepik.com/premium-vector/beauty-cream-ad_258787-3140.jpg",
    },
  ];

  return (
    <div className="w-full">

      {/* ================= AJIO-STYLE HERO ================= */}
      <div className="px-6 pt-6 mx-auto max-w-7xl">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !w-8 !h-1 !rounded-full",
            bulletActiveClass: "!bg-black",
          }}
          navigation
          loop
          className="overflow-hidden rounded-3xl"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Link to={slide.link}>
                <div className="relative h-[420px] w-full cursor-pointer">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="absolute inset-0 object-cover w-full h-full"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute max-w-md text-white left-12 bottom-12"
                  >
                    <p className="text-sm tracking-wide uppercase opacity-90">
                      {slide.subtitle}
                    </p>

                    <h1 className="mt-2 text-4xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="mt-3 text-sm opacity-90">
                      {slide.desc}
                    </p>

                    <button className="px-6 py-3 mt-6 text-sm font-semibold text-black bg-white rounded-full">
                      Shop Now
                    </button>
                  </motion.div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= DEALS ================= */}
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-semibold">
          Deals You’ll Love
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}
