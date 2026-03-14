import React, { useState, useRef } from "react";
import axios from "axios";
import { FaCamera, FaUpload, FaMagic, FaRobot, FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const SkinAnalyzer = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setResult(null);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append("image", image);

        try {
            const res = await axios.post("https://ecommerce-x4vm.onrender.com/api/ai/analyze-skin", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setResult(res.data);
        } catch (err) {
            console.error("Analysis Error:", err);
            setError("Analysis failed. Please ensure the photo is clear and try again.");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setImage(null);
        setPreview(null);
        setResult(null);
        setError(null);
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#EC4899]/5 border border-[#EC4899]/10 rounded-full mb-4">
                        <FaMagic className="text-[#EC4899] text-sm animate-pulse" />
                        <span className="text-[10px] font-bold text-[#EC4899] uppercase tracking-[0.3em]">Advanced Skin Intelligence</span>
                    </div>
                    <h1 className="text-5xl text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                        AI Skin <span className="text-[#C9A84C] italic">Analyzer</span>
                    </h1>
                    <p className="text-gray-400 font-light max-w-lg mx-auto leading-relaxed">
                        Experience the future of personalized beauty. Our advanced AI analyzes your skin health to curate the perfect regimen.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Upload Section */}
                    <div className="space-y-8">
                        <div 
                            className={`relative group h-[500px] rounded-[3rem] border-2 border-dashed transition-all duration-700 overflow-hidden flex flex-col items-center justify-center bg-white shadow-2xl shadow-slate-200/50 ${
                                preview ? "border-transparent" : "border-gray-200 hover:border-[#C9A84C]/50 hover:bg-gray-50/50"
                            }`}
                        >
                            {preview ? (
                                <>
                                    <img src={preview} className="absolute inset-0 w-full h-full object-cover" alt="Selfie Preview" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <button onClick={reset} className="p-4 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-all">
                                            <FaTrashAlt size={20} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center space-y-6 px-10">
                                    <div className="w-20 h-20 bg-[#C9A84C]/10 rounded-[2rem] flex items-center justify-center mx-auto text-[#C9A84C]">
                                        <FaCamera size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-medium text-slate-900">Upload Your Selfie</h3>
                                        <p className="text-xs text-gray-400">Ensure natural lighting and high resolution for the best analysis.</p>
                                    </div>
                                    <button 
                                        onClick={() => fileInputRef.current.click()}
                                        className="px-8 py-4 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-slate-200"
                                    >
                                        Select Image
                                    </button>
                                </div>
                            )}
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleFileChange} 
                                className="hidden" 
                                accept="image/*"
                            />
                        </div>

                        {preview && !result && (
                            <button 
                                onClick={handleAnalyze}
                                disabled={loading}
                                className={`w-full py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${
                                    loading ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-[#EC4899] text-white hover:bg-[#D61F69] shadow-2xl shadow-[#EC4899]/30"
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
                                        Analyzing Skin Matrix...
                                    </>
                                ) : (
                                    <>
                                        Start AI Analysis
                                    </>
                                )}
                            </button>
                        )}
                    </div>

                    {/* Results Section */}
                    <div className="space-y-8">
                        {loading ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 p-12 bg-white rounded-[3rem] shadow-xl border border-gray-50">
                                <div className="w-24 h-24 relative">
                                    <div className="absolute inset-0 border-4 border-[#C9A84C]/20 rounded-full" />
                                    <div className="absolute inset-0 border-4 border-t-[#C9A84C] rounded-full animate-spin" />
                                    <FaRobot size={32} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C9A84C] animate-pulse" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-xl font-medium text-slate-900">Scanning Bio-Markers</h4>
                                    <p className="text-xs text-gray-400 font-light italic">Our AI is identifying skin type, concerns, and curating your recommendation list...</p>
                                </div>
                            </div>
                        ) : result ? (
                            <div className="space-y-8 animate-fadeIn">
                                {/* Analysis Content */}
                                <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 space-y-8">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center">
                                            <FaCheckCircle size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold uppercase tracking-widest text-[#EC4899]">Analysis Complete</h4>
                                            <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Skin Type: {result.data.skinType}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h5 className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.4em]">Expert Findings</h5>
                                        <p className="text-[13px] text-slate-600 leading-relaxed font-light italic bg-gray-50/50 p-6 rounded-3xl border border-gray-100">
                                            "{result.analysis}"
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        {result.data.concerns?.map((concern, idx) => (
                                            <div key={idx} className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-wider text-center">
                                                {concern}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recommendations */}
                                <div className="space-y-6">
                                    <h5 className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.4em] ml-4">Curated Regimen</h5>
                                    <div className="grid grid-cols-2 gap-6">
                                        {result.recommendations?.map((product) => (
                                            <Link 
                                                to={`/product/${product._id}`} 
                                                key={product._id}
                                                className="group bg-white p-4 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-xl transition-all"
                                            >
                                                <div className="aspect-square rounded-2xl overflow-hidden mb-4 border border-gray-50">
                                                    <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={product.name} />
                                                </div>
                                                <h6 className="text-[11px] font-bold text-slate-900 line-clamp-1 group-hover:text-[#EC4899] transition-colors">{product.name}</h6>
                                                <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-widest">₹{product.price}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : error ? (
                             <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-red-50/50 rounded-[3rem] border border-red-100/50">
                                <p className="text-sm text-red-500 font-medium">{error}</p>
                                <button onClick={reset} className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-900 underline">Try Again</button>
                             </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-gray-100 rounded-[3rem] opacity-50">
                                <FaRobot size={48} className="text-gray-200 mb-6" />
                                <p className="text-xs text-gray-400 font-light italic">Upload a photo to unlock your skin's bio-signature analysis.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkinAnalyzer;
