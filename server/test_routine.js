import mongoose from "mongoose";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Product from "./models/Product.js";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/marketzen");
  
  const budget = 2500;
  const skinType = "oily";
  const concerns = ["acne", "texture"];

  const products = await Product.find({
    $or: [
      { category: { $regex: skinType || "", $options: "i" } },
      { tags: { $in: concerns || [] } },
      { category: { $in: ["cleanser", "moisturizer", "serum", "sunscreen"] } }
    ]
  }).limit(20).select("name price brand category description image");

  const productList = products.map(p => 
    `- ${p.name} (${p.brand}): ₹${p.price} [ID: ${p._id}]`
  ).join("\n");

  console.log("CATALOG GIVEN TO GEMINI:\n", productList);
  console.log("------------------------");

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
  console.log("GEMINI RAW RESPONSE:\n", text);

  mongoose.disconnect();
}

run();
