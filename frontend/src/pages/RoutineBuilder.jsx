import { useState } from "react";
import { API } from "./api.jsx";
import { FaWallet, FaMagic, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

export default function RoutineBuilder() {
  const [budget, setBudget] = useState(2000);
  const [skinType, setSkinType] = useState("Oily");
  const [concerns, setConcerns] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const skinTypes = ["Oily", "Dry", "Combination", "Sensitive", "Normal"];
  const allConcerns = ["Acne", "Dark Spots", "Fine Lines", "Hydration", "Texture"];

  const toggleConcern = (concern) => {
    setConcerns(prev => 
      prev.includes(concern) ? prev.filter(c => c !== concern) : [...prev, concern]
    );
  };

  const handleBuildParams = async () => {
    try {
      setLoading(true);
      const res = await API.post("/api/ai/build-routine", {
        budget,
        skinType,
        concerns
      });
      setResult(res.data);
      toast.success("Your routine has been architected!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to build routine. Try a higher budget.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <div className="bg-slate-900 text-white py-24 px-6 text-center overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://img.freepik.com/free-photo/beauty-spa_144627-46101.jpg" 
            className="w-full h-full object-cover" 
            alt="Background" 
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-4 bg-white/10 px-6 py-2 rounded-full backdrop-blur-md">
             <FaMagic className="text-[#C9A84C]" />
             <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Personalized Curation</span>
          </div>
          <h1 className="text-6xl font-light leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Routine <span className="text-[#C9A84C] italic">Architect</span>
          </h1>
          <p className="text-slate-400 text-lg font-light max-w-xl mx-auto">
            Define your parameters. Our AI intelligence optimizes your ritual for maximum potency within your budget.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* CONFIGURATOR */}
          <div className="lg:col-span-4 space-y-8 bg-white/80 backdrop-blur-xl border border-gray-100 p-10 rounded-[3rem] shadow-2xl">
            {/* Budget */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Target Budget</span>
                <span className="text-2xl font-light text-slate-900">₹{budget}</span>
              </div>
              <input 
                type="range" 
                min="500" 
                max="10000" 
                step="500"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#C9A84C]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold tracking-tighter uppercase">
                <span>Minimalist</span>
                <span>Elite</span>
              </div>
            </div>

            {/* Skin Type */}
            <div className="space-y-4">
               <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Skin Type</span>
               <div className="flex flex-wrap gap-2">
                 {skinTypes.map(type => (
                   <button
                    key={type}
                    onClick={() => setSkinType(type)}
                    className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                      skinType === type ? "bg-slate-900 text-white shadow-lg" : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                    }`}
                   >
                     {type}
                   </button>
                 ))}
               </div>
            </div>

            {/* Concerns */}
            <div className="space-y-4">
               <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Primary Concerns</span>
               <div className="flex flex-wrap gap-2">
                 {allConcerns.map(concern => (
                   <button
                    key={concern}
                    onClick={() => toggleConcern(concern)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 ${
                      concerns.includes(concern) ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/5" : "border-gray-100 text-gray-400 bg-gray-50 hover:border-gray-200"
                    } border`}
                   >
                     {concerns.includes(concern) && <FaCheckCircle />}
                     {concern}
                   </button>
                 ))}
               </div>
            </div>

            <button
              onClick={handleBuildParams}
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded-[2rem] py-6 px-10 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 hover:bg-[#0D0D0D] hover:shadow-2xl hover:shadow-[#C9A84C]/20 flex items-center justify-center gap-4 group disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FaMagic />
                  Initialize Architect
                </>
              )}
            </button>
          </div>

          {/* RESULTS */}
          <div className="lg:col-span-8 min-h-[600px]">
            <AnimatePresence mode="wait">
              {result ? (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-12"
                >
                  <div className="bg-gradient-to-br from-[#C9A84C] to-[#A6893B] p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10 space-y-6">
                       <h2 className="text-4xl font-light italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                         Architect's Notes
                       </h2>
                       <p className="text-lg font-light leading-relaxed max-w-2xl text-white/90">
                         "{result.note}"
                       </p>
                       <div className="flex items-center gap-8 pt-4">
                          <div className="text-center">
                             <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Items</p>
                             <p className="text-2xl font-bold">{result.routine.length}</p>
                          </div>
                          <div className="h-8 w-px bg-white/20" />
                          <div className="text-center">
                             <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Total Value</p>
                             <p className="text-2xl font-bold">₹{result.total}</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {result.routine.map((product, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        key={product._id}
                        className="relative"
                      >
                         <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900 border-4 border-white text-white flex items-center justify-center text-[10px] font-bold z-10 shadow-lg">
                           {idx + 1}
                         </div>
                         <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center border-4 border-dashed border-gray-100 rounded-[3rem] p-20 text-center space-y-6">
                  <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center text-gray-200">
                    <FaMagic size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-light text-gray-400" style={{ fontFamily: "'Playfair Display', serif" }}>Awaiting Configuration</h3>
                    <p className="text-sm text-gray-300 max-w-xs mx-auto">
                      Adjust your parameters on the left and initialize the architect to generate your personalized ritual.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
