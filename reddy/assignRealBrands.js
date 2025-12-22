import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const BRAND_POOLS = {
  skin: ["Lakme", "Himalaya", "Neutrogena", "Nivea", "The Body Shop", "Cetaphil", "Biotique", "L'Oreal", "Garnier", "Plum"],
  hair: ["Pantene", "Head & Shoulders", "Dove", "L'Oreal", "Matrix", "Himalaya", "OGX", "Tresemme", "Murray&Lanman", "Nature's Essence"],
  makeup: ["Lakme", "Maybelline", "MAC", "L'Oreal", "NYX", "ColorBar", "Sugar", "Revlon", "Wet n Wild", "Clinique"],
  fragrance: ["Gucci", "Chanel", "Calvin Klein", "Davidoff", "Versace", "Yardley", "Armaf", "The Body Shop", "Jo Malone", "Britney Spears"],
  men: ["Nivea Men", "Axe", "Beardo", "Park Avenue", "Old Spice", "Dove Men+Care", "Fa", "Ginger"],
  wellness: ["Himalaya", "Patanjali", "Abbott", "HealthKart", "MuscleBlaze", "Amway", "GNC", "Organic India"],
  "bath-body": ["Bath & Body Works", "The Body Shop", "Nivea", "Dove", "Khadi"],
  "mom-baby": ["Johnson's", "Pigeon", "Mothercare", "Mee Mee", "Chicco"],
  minis: ["Lakme", "Maybelline", "Garnier"],
  gifts: ["The Body Shop", "Forest Essentials", "Nykaa", "Sephora"]
};

function pickBrand(category) {
  const key = (category || "").toLowerCase();
  const pool = BRAND_POOLS[key] || [].concat(...Object.values(BRAND_POOLS));
  return pool[Math.floor(Math.random() * pool.length)];
}

async function run() {
  if (!process.env.MONGO_URI) {
    console.error("MONGO_URI missing in .env");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB — assigning real brands...");

  const products = await Product.find({});
  let updated = 0;

  for (const p of products) {
    const newBrand = pickBrand(p.category);
    if (p.brand !== newBrand) {
      p.brand = newBrand;
      await p.save();
      updated++;
    }
  }

  console.log(`Assigned brands to ${updated} products.`);
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error("Error assigning brands:", err);
  process.exit(1);
});
