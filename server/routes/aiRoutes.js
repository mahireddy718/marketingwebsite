import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");

const upload = multer({ dest: "uploads/" });

// Helper to convert local file for Gemini
function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
}

/* ================= AI BEAUTY ASSISTANT ================= */
router.post("/chat", async (req, res) => {
  const { message, userId, history = [] } = req.body;

  try {
    const searchTerms = message.toLowerCase().split(' ').filter(word => word.length > 3);
    let productContext = [];
    
    if (searchTerms.length > 0) {
      productContext = await Product.find({
        $or: [
          { name: { $regex: searchTerms.join('|'), $options: 'i' } },
          { category: { $regex: searchTerms.join('|'), $options: 'i' } },
          { brand: { $regex: searchTerms.join('|'), $options: 'i' } }
        ]
      }).limit(5).select("name price brand category description image");
    } else {
      productContext = await Product.find({}).limit(5).select("name price brand category description image");
    }

    const contextString = productContext.map(p => 
      `- ${p.name} (${p.brand}): ${p.category}. ₹${p.price}. ${p.description || ''}`
    ).join('\n');

    const systemInstruction = `You are the MarketZen AI Beauty Assistant, a luxury boutique concierge. 
Your goal is to provide expert, personalized beauty, skincare, and wellness advice.
Be elegant, helpful, and professional. 
Recommend products from our actual catalog when relevant.
Here is the current catalog context for your recommendations:
${contextString}
If a user asks for something not in the context, recommend the closest match or suggest they browse our full collection.
Keep responses concise and ultra-premium in tone.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction });
    
    const formattedHistory = history.map(h => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.content }]
    }));

    const chatSession = model.startChat({ history: formattedHistory });
    const result = await chatSession.sendMessage(message);

    res.json({ 
      reply: result.response.text(),
      recommendations: productContext.map(p => ({
        id: p._id,
        name: p.name,
        price: p.price,
        image: p.image
      }))
    });

  } catch (err) {
    console.error("AI Chat Error:", err);
    res.status(500).json({ message: "AI assistant is taking a beauty sleep. Please try again later." });
  }
});

/* ================= CONVERSATIONAL SEARCH ================= */
router.get("/smart-search", async (req, res) => {
  const { q } = req.query;

  try {
    const systemInstruction = `You are a search query optimizer for a luxury beauty e-commerce site. 
Convert natural language queries into a JSON object with search parameters.
Supported parameters: category, minPrice, maxPrice, brand, sort.
Output ONLY the raw JSON object, NO markdown formatting, NO backticks.
Example: "Gifts under 1000" -> {"maxPrice": 1000}
Example: "Oily skin moisturizer" -> {"category": "moisturizer", "q": "oily skin"}`;
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction });
    const result = await model.generateContent(q);
    let text = result.response.text();
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const searchParams = JSON.parse(text);
    
    let query = {};
    if (searchParams.category) query.category = { $regex: searchParams.category, $options: 'i' };
    if (searchParams.brand) query.brand = { $regex: searchParams.brand, $options: 'i' };
    if (searchParams.maxPrice) query.price = { $lte: searchParams.maxPrice };
    if (searchParams.minPrice) query.price = { ...query.price, $gte: searchParams.minPrice };
    if (searchParams.q) query.name = { $regex: searchParams.q, $options: 'i' };
    
    const results = await Product.find(query).limit(12);
    res.json(results);

  } catch (err) {
    console.error("AI Search Error:", err);
    res.status(500).json({ message: "Smart search failed" });
  }
});

/* ================= AI SKIN ANALYZER ================= */
router.post("/analyze-skin", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No image provided" });

  const imagePath = req.file.path;
  try {
    const imageType = req.file.mimetype;
    const imagePart = fileToGenerativePart(imagePath, imageType);

    const systemInstruction = `You are a professional AI Dermatologist and Skincare Expert for MarketZen. 
Analyze the provided photo and identify:
1. Skin Type (Oily, Dry, Combination, Normal, Sensitive)
2. Main Concerns (Acne, Brightness, Texture, Aging, etc.)
3. Recommendations: Suggest a specific routine.
Be professional, supportive, and luxury-boutique in tone.
Include a JSON block at the end with keys: "skinType", "concerns" (array), "routine" (array).
Do not enclose the final JSON block in markdown backticks if possible, just pure text and JSON.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction });
    const result = await model.generateContent(["Please analyze my skin and provide expert recommendations.", imagePart]);
    
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    const fullText = result.response.text();
    const jsonMatch = fullText.match(/\{[\s\S]*\}/);
    
    let analysisData = {};
    if (jsonMatch) {
      try {
        let cleanJson = jsonMatch[0].replace(/```json/gi, "").replace(/```/g, "").trim();
        analysisData = JSON.parse(cleanJson);
      } catch (parseErr) {
        console.error("Skin Analyzer JSON Parse Error:", parseErr, "Raw output:", jsonMatch[0]);
      }
    }

    const skinTypeQuery = analysisData.skinType || "Normal";
    const recommendedProducts = await Product.find({
      $or: [
        { category: { $regex: skinTypeQuery, $options: "i" } },
        { tags: { $in: analysisData.concerns || [] } }
      ]
    }).limit(4);

    res.json({
      analysis: fullText.replace(/\{[\s\S]*\}/, "").replace(/```json/gi, "").replace(/```/g, "").trim() || "Analysis complete. Here is our expert finding.",
      data: {
        skinType: analysisData.skinType || "Undetermined",
        concerns: analysisData.concerns || [],
        routine: analysisData.routine || []
      },
      recommendations: recommendedProducts
    });

  } catch (err) {
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    console.error("AI Skin Analysis Error:", err);
    res.status(500).json({ message: "Analysis failed. Ensure the photo is clear." });
  }
});

/* ================= AI REVIEW SUMMARIZER ================= */
router.get("/summarize-reviews/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).limit(20);
    
    if (reviews.length === 0) {
      return res.json({ summary: "No reviews yet. Be the first to share your experience!" });
    }

    const reviewText = reviews.map(r => `[Rating: ${r.rating}/5] ${r.comment}`).join("\n");

    const systemInstruction = `You are a shopping assistant for MarketZen. 
Summarize the following customer reviews for a product in 2-3 concise, high-impact sentences.
Highlight what customers love and any common complaints. 
Tone: Professional, honest, and helpful.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction });
    const result = await model.generateContent(`Please summarize these reviews:\n${reviewText}`);

    res.json({ summary: result.response.text() });
  } catch (err) {
    console.error("AI Summary Error:", err);
    res.status(500).json({ message: "Failed to generate AI summary" });
  }
});

/* ================= AI ROUTINE BUILDER ================= */
router.post("/build-routine", async (req, res) => {
  const { budget, skinType, concerns } = req.body;

  try {
    let products = await Product.find({
      $or: [
        { name: { $regex: skinType || "skin", $options: "i" } },
        { description: { $regex: skinType || "skin", $options: "i" } },
        ...(Array.isArray(concerns) && concerns.length > 0 ? concerns.map(c => ({ name: { $regex: c, $options: "i" } })) : []),
        ...(Array.isArray(concerns) && concerns.length > 0 ? concerns.map(c => ({ description: { $regex: c, $options: "i" } })) : [])
      ]
    }).limit(30).select("name price brand category description image");

    if (products.length < 10) {
      const fallback = await Product.find({ category: { $regex: "Skin", $options: "i" } })
        .limit(20)
        .select("name price brand category description image");
      
      const all = [...products, ...fallback];
      products = Array.from(new Map(all.map(p => [p._id.toString(), p])).values()).slice(0, 25);
    }

    const productList = products.map(p => 
      `- ${p.name} (${p.brand}): ₹${p.price} [ID: ${p._id}]`
    ).join("\n");

    const systemInstruction = `You are the MarketZen Elite Routine Architect. 
Create a complete skincare routine (Cleanser, Serum, Moisturizer, Sunscreen) for a budget of ₹${budget}.
Use ONLY products from the list provided below. 
Sum of prices MUST BE ≤ ₹${budget}. 
If the budget is too low for all 4, prioritize Cleanser and Moisturizer.
Output ONLY a JSON array of product IDs and a short "architectsNote".
Example: {"productIds": ["id1", "id2"], "architectsNote": "A minimalist glow regimen."}
Output ONLY the raw JSON string, NO markdown blocks, NO backticks.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction });
    const result = await model.generateContent(`Catalog:\n${productList}\n\nUser Profile: ${skinType}, ${concerns?.join(', ')}`);
    
    let text = result.response.text();
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    const parsedResult = JSON.parse(text);
    
    const selectedProducts = await Product.find({ _id: { $in: parsedResult.productIds } });

    res.json({
      routine: selectedProducts,
      note: parsedResult.architectsNote,
      total: selectedProducts.reduce((sum, p) => sum + p.price, 0)
    });

  } catch (err) {
    console.error("Routine Builder Error:", err);
    res.status(500).json({ message: "Failed to architect your routine." });
  }
});

/* ================= AI SHADE FINDER ================= */
router.post("/find-shade", upload.single("image"), async (req, res) => {
  const { productId } = req.body;

  try {
    if (!req.file) return res.status(400).json({ message: "No image provided" });

    const productImage = req.file.path;
    const imagePart = fileToGenerativePart(productImage, req.file.mimetype);

    const product = await Product.findById(productId);
    const productContext = product 
      ? `Product: ${product.name}. Description: ${product.description}`
      : "General foundation/lipstick matching.";

    const systemInstruction = `You are the MarketZen Elite Colorist. 
Analyze the skin tone in the provided photo and match it to a shade.
Context: ${productContext}
Return ONLY a JSON object with:
- "shadeMatch": The suggested shade name or description.
- "confidence": percentage.
- "advice": 1-sentence tip on application.
NO markdown formatting, NO backticks.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction });
    const result = await model.generateContent(["What is my perfect shade match?", imagePart]);
    
    fs.unlinkSync(productImage);

    let text = result.response.text();
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    res.json(JSON.parse(text));

  } catch (err) {
    console.error("Shade Finder Error:", err);
    res.status(500).json({ message: "Color matching failed. Please use natural lighting." });
  }
});

/* ================= AI INGREDIENT CHECKER ================= */
router.post("/check-ingredients", async (req, res) => {
  const { ingredients } = req.body;

  try {
    const systemInstruction = `You are the MarketZen Safety & Bio-chemist. 
Analyze the provided skincare/beauty ingredients.
Flag any:
1. POTENTIAL IRRITANTS/ALLERGENS.
2. HARMFUL COMBINATIONS (e.g., Vitamin C + Retinol if used together without care).
3. STAR INGREDIENTS and their benefits.
Output ONLY a JSON object: 
{
  "safetyScore": 0-100,
  "analysis": ["point 1", "point 2"],
  "verdict": "Safe/Caution/Avoid",
  "proTip": "1 sentence advice"
}
NO markdown formatting, NO backticks.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction });
    const result = await model.generateContent(`Analyze these ingredients:\n${ingredients}`);

    let text = result.response.text();
    text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    res.json(JSON.parse(text));

  } catch (err) {
    console.error("Ingredient Checker Error:", err);
    res.status(500).json({ message: "Safety analysis failed. Ensure text is legible." });
  }
});

export default router;
