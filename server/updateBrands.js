import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB — updating brands...");

  const cursor = Product.find({
    $or: [{ brand: { $exists: false } }, { brand: null }, { brand: "" }],
  }).cursor();

  let updated = 0;
  for await (const doc of cursor) {
    doc.brand = doc.name || "Generic";
    await doc.save();
    updated++;
  }

  console.log(`Brands updated for ${updated} products.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Error updating brands:", err);
  process.exit(1);
});
