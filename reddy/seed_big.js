import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const CATEGORIES = [
  "skin",
  "hair",
  "makeup",
  "fragrance",
  "men",
  "wellness",
  "What's New",
  "Bath & Body",
  "Tools",
  "Mom & Baby",
  "Minis",
  "Gifts"
];

function getImageUrl(category, index) {
  return `https://source.unsplash.com/800x800/?${category},product&sig=${index}`;
}

function generateProduct(category, index) {
  return {
    name: faker.commerce.productName() + " " + faker.commerce.productMaterial(),
    description: faker.commerce.productDescription(),
    price: faker.number.int({ min: 99, max: 1999 }), // FIXED
    image: getImageUrl(category, index + Math.floor(Math.random() * 9999)),
    category,
    brand: faker.company.name().split(" ")[0],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

(async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI missing");
      process.exit(1);
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected.");

    console.log("Clearing existing products...");
    await Product.deleteMany({});

    const allProducts = [];

    for (const category of CATEGORIES) {
      console.log(`Generating 200 products for: ${category}`);
      for (let i = 0; i < 200; i++) {
        allProducts.push(generateProduct(category, i));
      }
    }

    console.log("Total products:", allProducts.length);

    const chunkSize = 500;
    for (let i = 0; i < allProducts.length; i += chunkSize) {
      await Product.insertMany(allProducts.slice(i, i + chunkSize));
      console.log(`Inserted chunk ${i}-${i + chunkSize}`);
    }

    console.log("Seed completed!");
    process.exit(0);

  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
})();
