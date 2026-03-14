import mongoose from "mongoose";
import Product from "./models/Product.js";
import dotenv from "dotenv";

dotenv.config();

const enhanceProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const makeupProducts = [
      {
        name: "Luxe Veil Fluid Foundation",
        brand: "MarketZen Elite",
        price: 3899,
        category: "makeup",
        image: "https://img.freepik.com/premium-photo/beauty-product-branding_23-2150330541.jpg",
        description: "A breathable, long-wear foundation. Available in 24 shades from 'Alabaster Silk' to 'Onyx Velvet'. Our AI vision can match your undertone perfectly.",
        tags: ["foundation", "makeup", "luxury"]
      },
      {
        name: "Satin Kiss Weightless Lipstick",
        brand: "MarketZen Elite",
        price: 1899,
        category: "makeup",
        image: "https://img.freepik.com/premium-photo/luxury-lipstick-case_23-2149429547.jpg",
        description: "Hydrating matte finish. Shade matched for your look. Available in 'Nude Lyric', 'Ruby Legacy', and 'Mauve Mist'.",
        tags: ["lipstick", "makeup"]
      }
    ];

    await Product.insertMany(makeupProducts);
    console.log("Makeup products added for Shade Finder demo!");
    process.exit();
  } catch (err) {
    console.error("Enhancement error:", err);
    process.exit(1);
  }
};

enhanceProducts();
