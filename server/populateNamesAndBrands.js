import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

function makeNameFromDescription(desc) {
  if (!desc) return "Product";
  // take first sentence or first 4 words
  const sentence = desc.split(".")[0];
  const words = sentence.split(/\s+/).filter(Boolean).slice(0, 4);
  const name = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return name || "Product";
}

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB — populating names/brands...");

  const cursor = Product.find({ $or: [{ name: { $exists: false } }, { name: "" }, { brand: { $exists: false } }, { brand: "" }] }).cursor();

  let updated = 0;
  for await (const doc of cursor) {
    let changed = false;
    if (!doc.name || doc.name === "") {
      doc.name = makeNameFromDescription(doc.description);
      changed = true;
    }
    if (!doc.brand || doc.brand === "") {
      // prefer any existing brand value; else use first word of name
      const firstWord = (doc.name || "").split(/\s+/)[0] || "Generic";
      doc.brand = firstWord;
      changed = true;
    }
    if (changed) {
      await doc.save();
      updated++;
    }
  }

  console.log(`Updated ${updated} products.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
