import { useState } from "react";
import { API } from "./api.jsx";
import { FaMicroscope, FaExclamationTriangle, FaLeaf, FaFlask, FaCheckCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function IngredientChecker() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!ingredients.trim()) return toast.error("Please paste some ingredients first.");
    
    try {
      setLoading(true);
      const res = await API.post("/api/ai/check-ingredients", { ingredients });
      setResult(res.data);
      toast.success("Safety analysis complete!");
    } catch (err) {
      console.error(err);
      toast.error("Analysis failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <div className="bg-slate-900 border-b border-white/5 py-24 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
             <FaFlask className="text-[#EC4899]" />
             <span className="text-[10px] font-bold text-white uppercase tracking-[0.4em]">Formula Intelligence</span>
          </div>
          <h1 className="text-6xl text-white font-light leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Ingredient <span className="text-[#EC4899] italic">Decryptor</span>
          </h1>
          <p className="text-slate-400 text-lg font-light max-w-xl mx-auto">
            Demystify the complex chemistry behind your products. Instant safety profiles and potential interaction alerts.
          </p>
        </motion.div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-12 pb-24">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-10 lg:p-16 space-y-12">
          
          {/* INPUT AREA */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#EC4899]">Formula Components</h3>
              <button 
                onClick={() => setIngredients("")}
                className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-slate-900"
              >
                Clear All
              </button>
            </div>
            <textarea 
              className="w-full h-48 p-8 bg-gray-50 border border-gray-100 rounded-[2rem] text-sm text-slate-900 placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-[#EC4899]/5 focus:bg-white transition-all transition-duration-500"
              placeholder="Paste ingredients here... (e.g. Water, Glycerin, Niacinamide, Retinol...)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
            />
            <button 
              onClick={handleCheck}
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded-[2rem] py-6 px-10 text-[10px] font-bold uppercase tracking-[0.4em] transition-all duration-500 hover:bg-[#0D0D0D] hover:shadow-2xl hover:shadow-[#EC4899]/20 flex items-center justify-center gap-4 group"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <FaMicroscope />
                  Initialize Decryption
                </>
              )}
            </button>
          </div>

          {/* RESULTS */}
          <AnimatePresence>
            {result && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-10 pt-10 border-t border-gray-50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                   <div className="space-y-4">
                      <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        result.verdict === 'Safe' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {result.verdict === 'Safe' ? <FaCheckCircle /> : <FaExclamationTriangle />}
                        Verdict: {result.verdict}
                      </div>
                      <h2 className="text-4xl text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Safety Analysis
                      </h2>
                      <p className="text-slate-500 text-sm font-light leading-relaxed italic">
                        "{result.proTip}"
                      </p>
                   </div>
                   <div className="flex justify-center">
                      <div className="relative w-40 h-40">
                         <svg className="w-full h-full" viewBox="0 0 36 36">
                            <path className="text-gray-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="2" />
                            <path className="text-[#EC4899] transition-all duration-1000" strokeDasharray={`${result.safetyScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="2" strokeLinecap="round" />
                         </svg>
                         <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-slate-900">{result.safetyScore}</span>
                            <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Score</span>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100 space-y-6">
                      <h4 className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#EC4899]">
                        <FaFlask /> Advanced Findings
                      </h4>
                      <div className="space-y-4">
                         {result.analysis.map((point, i) => (
                           <div key={i} className="flex gap-4 items-start">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#EC4899] mt-1.5 shrink-0" />
                              <p className="text-sm text-slate-600 leading-relaxed font-light">{point}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#EC4899]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                      <div className="relative z-10 space-y-4">
                         <h4 className="text-[10px] font-bold text-[#EC4899] uppercase tracking-[0.4em]">Expert Recommendation</h4>
                         <p className="text-white text-lg font-light italic leading-relaxed">
                            "Transparency in skincare is absolute. Knowing exactly what touches your dermis is the first step in a professional ritual."
                         </p>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
