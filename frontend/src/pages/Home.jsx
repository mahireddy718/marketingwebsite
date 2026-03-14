import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { FaArrowRight, FaMagic } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

export default function Home() {
  const heroSlides = [
    {
      title: "New Red Beauty Collection",
      subtitle: "Exclusive Launch",
      desc: "Experience the ultimate collection for your aesthetic.",
      video: "https://cdn.tirabeauty.com/v2/super-fire-62c344/original/KKK_Red_Banner_HZ_Final.mp4",
      link: "/category/makeup",
    },
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
      img: "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/original/CLP-Fragrance-Calvin-Klein-D-1766333450648.jpeg?dpr=1",
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
      name: "Daily Face  Sunscreen",
      price: 199,
      image:
        "https://img.freepik.com/premium-vector/face-wash-ad-banner_258787-3120.jpg",
    },
    {
      id: 4,
      name: "HYA Beach Cream",
      price: 349,
      image:
        "https://cdn.tirabeauty.com/v2/billowing-snowflake-434234/tira-p/wrkr/company/1/applications/62d53777f5ad942d3e505f77/theme/pictures/free/resize-w:800/Lakme-New-on-Tira-Desktop-1773306063370.jpeg",
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
        {/* Admin Quick Link */}
        {localStorage.getItem("role") === "admin" && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link 
              to="/admin" 
              className="group inline-flex items-center gap-4 bg-slate-900 shadow-2xl shadow-slate-200 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-[1.02]"
            >
              <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center text-[#C9A84C]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <div className="flex flex-col items-start translate-y-[-1px]">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#C9A84C] mb-0.5">Management Portal</span>
                <span className="text-sm font-medium tracking-wide" style={{ fontFamily: "'Jost', sans-serif" }}>Admin Dashboard</span>
              </div>
            </Link>
          </motion.div>
        )}

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !w-8 !h-1 !rounded-full !mx-1",
            bulletActiveClass: "!bg-[#C9A84C]",
          }}
          navigation
          loop
          className="overflow-hidden rounded-[3rem] shadow-2xl shadow-black/5"
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Link to={slide.link}>
                <div className="relative h-[480px] w-full cursor-pointer overflow-hidden group">
                  {slide.video ? (
                    <video
                      src={slide.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-[4s]"
                    />
                  ) : (
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="absolute inset-0 object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-[4s]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute max-w-lg text-white left-14 bottom-14"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#FBCFE8] mb-4">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-5xl lg:text-6xl font-light leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {slide.title}
                    </h1>
                    <p className="mt-6 text-sm opacity-80 font-light tracking-wide italic max-w-xs" style={{ fontFamily: "'Jost', sans-serif" }}>
                      {slide.desc}
                    </p>
                    
                    <div className="mt-10">
                      <span className="inline-block px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.3em] rounded-full group-hover:bg-[#C9A84C] group-hover:text-white transition-colors duration-500">
                        Explore Collection
                      </span>
                    </div>
                  </motion.div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= BRAND VIDEOS ================= */}
      <div className="px-6 py-24 mx-auto max-w-7xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
            Featured Campaigns
          </h2>
          <div className="h-px w-16 bg-[#FBCFE8] mx-auto" />
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Visual Narratives of Style</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {brandVideos.map((video) => (
            <Link key={video.id} to="/category/makeup">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden bg-black rounded-[2.5rem] shadow-2xl group shadow-black/5"
              >
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-[520px] opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  <p className="text-[10px] font-bold text-[#C9A84C] uppercase tracking-[0.4em] mb-2">Exclusive Reveal</p>
                  <h3 className="text-xl font-light text-white tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>{video.title}</h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= AI SKIN SECTION ================= */}
      <div className="px-6 py-24 mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[4rem] bg-slate-900 h-[500px] flex items-center shadow-2xl">
           <div className="absolute inset-0 opacity-40">
              <img 
                src="https://img.freepik.com/free-photo/beautiful-woman-is-washing-her-face-with-cleansing-foam_329181-12563.jpg" 
                className="w-full h-full object-cover" 
                alt="AI Skin Analysis" 
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
           </div>

           <div className="relative z-10 p-20 max-w-2xl space-y-8">
              <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-md">
                 <div className="w-2 h-2 rounded-full bg-[#EC4899] animate-pulse" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Next-Gen Intelligence</span>
              </div>
              <h2 className="text-6xl text-white font-light leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                Pure Skin <br /> <span className="text-[#C9A84C] italic">Perspective</span>
              </h2>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Unlock the data behind your skin. Our advanced AI vision analyzes your bio-matrix to curate a professional-grade ritual, unique to you.
              </p>
              <Link 
                to="/skin-analyzer" 
                className="inline-flex items-center gap-6 group hover:translate-x-2 transition-transform duration-500"
              >
                <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center text-slate-900 shadow-2xl group-hover:bg-[#C9A84C] group-hover:text-white transition-colors duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <span className="text-xs font-bold text-white uppercase tracking-[0.3em]">Launch Analysis</span>
              </Link>
           </div>
        </div>
      </div>

      {/* ================= ROUTINE ARCHITECT SECTION ================= */}
      <div className="px-6 py-24 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-[#FDFCFB] rounded-[4rem] p-16 border border-gray-100 shadow-xl overflow-hidden relative">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
           
           <div className="space-y-8 relative z-10">
              <div className="inline-flex items-center gap-4 bg-white px-6 py-2 rounded-full shadow-sm border border-gray-100">
                 <FaMagic className="text-[#C9A84C]" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">Artisan Curation</span>
              </div>
              <h2 className="text-5xl text-slate-900 font-light leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                The Routine <span className="text-[#C9A84C] italic">Architect</span>
              </h2>
              <p className="text-slate-600 text-lg font-light leading-relaxed">
                Stop guessing. Our AI intelligence curates a professional-grade ritual based on your skin type and concerns, optimized perfectly for your budget. 
              </p>
              
              <div className="flex flex-col gap-6 pt-4">
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#C9A84C]">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-slate-900 tracking-wide">Budget Aware</h4>
                       <p className="text-xs text-slate-400">Maximize results within your chosen price range.</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#C9A84C]">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                       <h4 className="text-sm font-bold text-slate-900 tracking-wide">Safety First</h4>
                       <p className="text-xs text-slate-400">AI-verified ingredient compatibility for every routine.</p>
                    </div>
                 </div>
              </div>

              <Link 
                to="/routine-builder" 
                className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C9A84C] transition-all duration-500 shadow-2xl shadow-slate-200"
              >
                Launch Architect <FaArrowRight />
              </Link>
           </div>

           <div className="relative h-[600px] rounded-[3rem] overflow-hidden group">
              <img 
                src="https://img.freepik.com/free-photo/cosmetic-bottles-with-chamomile-green-leaves_23-2148181395.jpg" 
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
                alt="Routine Curation" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
           </div>
        </div>
      </div>

      {/* ================= DEALS ================= */}
      <div className="px-6 py-24 mx-auto max-w-7xl bg-gray-50/50 rounded-[4rem] border border-gray-50 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 px-4">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
              Treasures of the Season
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.4em]">Curated Selections with Exceptional Value</p>
          </div>
          <Link to="/category/skin" className="mt-8 md:mt-0 text-[10px] font-bold text-[#C9A84C] uppercase tracking-[0.3em] hover:text-slate-900 transition-colors border-b border-[#C9A84C] pb-1">
            View All Curations
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
