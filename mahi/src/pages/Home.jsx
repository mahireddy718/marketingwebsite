import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

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
      img: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/BOJ-Desktop-1766137382762.jpeg?dpr=1",
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
      img: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Beardo-Top-Carousel-D-1766323345998.jpeg?dpr=1",
      link: "/category/men",
    },
    {
      title: "Bath & Body",
      subtitle: "Relax & Refresh",
      desc: "Wellness starts here.",
      img: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/DIP-Desktop-1766314327576.jpeg?dpr=1",
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
      img: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/platform/extensions/widget-manager/free/original/5TH-aVwFJ-Akind-Top-Banner-Desktop.jpg",
      link: "/category/minis",
    },
    {
      title: "Gift Combos",
      subtitle: "Festive Specials",
      desc: "Curated gifting made easy.",
      img: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/Wedding-top-carousel-desk-1758087102331.jpeg?dpr=1",
      link: "/category/gifts",
    },
  ];

  const deals = [
    {
      id: 1,
      name: "Glow Skin Serum",
      price: 299,
      image:
        "https://img.freepik.com/premium-vector/cosmetics-skin-care-product-ads-with-bottle-banner-ad-beauty-products-with-paper-art-love_258787-2914.jpg",
    },
    {
      id: 2,
      name: "Hair Strength Oil",
      price: 249,
      image:
        "https://img.freepik.com/premium-vector/hair-care-products-ad_258787-3104.jpg",
    },
    {
      id: 3,
      name: "Daily Face Wash",
      price: 199,
      image:
        "https://img.freepik.com/premium-vector/face-wash-ad-banner_258787-3120.jpg",
    },
    {
      id: 4,
      name: "Night Repair Cream",
      price: 349,
      image:
        "https://img.freepik.com/premium-vector/beauty-cream-ad_258787-3140.jpg",
    },
    // -------- NEW PRODUCTS (Tira / Beardo style) --------
    {
      id: 5,
      name: "Beardo Ultimate Grooming Combo",
      price: 899,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/beardo/COMBO_240105061543-P-V/0/4jJuLMpwPF-1115802_Combo_3-1.jpg",
    },
    {
      id: 6,
      name: "Beardo Beard Care Essentials Kit",
      price: 1099,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:1080/beardo/COMBO_240617093052-XB2/0/91cnGQcUZv-1142149_Combo_86-1.jpg",
    },
    {
      id: 7,
      name: "Luxury Eau De Parfum",
      price: 1299,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:2360/MQE2t4rduJb-1184971_1.jpg",
    },
    {
      id: 8,
      name: "Premium Fragrance Spray",
      price: 999,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:2360/1143822/aoR1t47tTgj-1143822-1.jpg",
    },
    {
      id: 9,
      name: "Refreshing Body Mist",
      price: 799,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:2360/1092599/4ntjF7M5a6-8901030824159_1.jpg",
    },
    {
      id: 10,
      name: "Daily Grooming Essentials",
      price: 699,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:2360/d6rBJDazj4-1053243_1.jpg",
    },
    {
      id: 11,
      name: "Hydrating Face Moisturizer",
      price: 999,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:2360/1134268/eokTXLsIEv-1134268_1.jpg",
    },
    {
      id: 12,
      name: "Vitamin C Brightening Serum",
      price: 1199,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:2360/1127911/5_2GGOpZ4-8901030960147_1.jpg",
    },
    {
      id: 13,
      name: "Luxury Eau De Parfum",
      price: 1599,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:2360/1143221/IOIy0WEMcs-1143221-1.jpg",
    },
    {
      id: 14,
      name: "Nourishing Hair Care Shampoo",
      price: 699,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:2360/1067255/A_Oc8BTN4-1067255_1.jpg",
    },
    {
      id: 15,
      name: "Repair & Protect Hair Mask",
      price: 899,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:2360/1157834/GHaIA_1vGU-1157834_1.jpg",
    },
    {
      id: 16,
      name: "Jo Malone London Signature Fragrance",
      price: 6499,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/resize-w:800/Jo-Malone-London-1766146482040.jpeg",
    },
    {
      id: 17,
      name: "Allies of Skin Advanced Skincare",
      price: 4899,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/resize-w:800/Allies-of-skin-Tira-red-D-1766146629899.jpeg",
    },
    {
      id: 18,
      name: "Refreshing Facial Cleanser",
      price: 549,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/products/pictures/item/free/resize-w:2360/1076219/u-BLOjFBR-1076219_1.jpg",
    },
  ];

  const brandVideos = [
    {
      id: 1,
      title: "NARS Summer Collection",
      src: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/platform/extensions/widget-manager/free/original/Ouhqk0OqR-NARS_SU25_Web_1.mp4",
    },
    {
      id: 2,
      title: "Lakmé x Aneet",
      src: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/platform/extensions/widget-manager/free/original/3l4alVR-k-Lakme-Aneet_Web.mp4",
    },
    {
      id: 3,
      title: "Lakmé x Kareena",
      src: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/platform/extensions/widget-manager/free/original/DfGm026H6-Lakme-Kareena_Web.mp4",
    },
  ];
  

  return (
    <div className="w-full">

      {/* ================= HERO ================= */}
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
                  <div className="absolute inset-0 bg-black/20" />
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute max-w-md text-white left-12 bottom-12"
                  >
                    <p className="text-sm uppercase opacity-90">
                      {slide.subtitle}
                    </p>
                    <h1 className="mt-2 text-4xl font-bold">
                      {slide.title}
                    </h1>
                    <p className="mt-3 text-sm opacity-90">
                      {slide.desc}
                    </p>
                  </motion.div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= BRAND VIDEOS (NOW HERE) ================= */}
      <div className="px-6 py-16 mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-semibold">
          Featured Campaigns
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {brandVideos.map((video) => (
            <Link key={video.id} to="/category/makeup">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative overflow-hidden bg-black rounded-2xl"
              >
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-[420px]"
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm font-medium text-white">{video.title}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
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

      <Footer />
    </div>
  );
}
