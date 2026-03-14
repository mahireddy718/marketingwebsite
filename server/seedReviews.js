import mongoose from "mongoose";
import Review from "./models/Review.js";
import Product from "./models/Product.js";
import User from "./models/user.js";
import dotenv from "dotenv";

dotenv.config();

const seedReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const products = await Product.find().limit(5);
    const user = await User.findOne();

    if (!user || products.length === 0) {
      console.log("No users or products found to seed reviews.");
      process.exit();
    }

    const sampleReviews = [
      {
        rating: 5,
        comment: "Absolutely love this moisturizer! It's so lightweight and hydrating. My skin feels like silk.",
        title: "Must have!",
        name: user.name || "Anonymous",
        user: user._id,
      },
      {
        rating: 4,
        comment: "Great product, but the scent is a bit too strong for me. It works well though.",
        title: "Smells strong but works",
        name: user.name || "Anonymous",
        user: user._id,
      },
      {
        rating: 5,
        comment: "The best vitamin C serum I've ever used. Dark spots are fading in just two weeks!",
        title: "Game changer",
        name: user.name || "Anonymous",
        user: user._id,
      },
      {
        rating: 2,
        comment: "I broke out after using this for 3 days. Might be too heavy for oily skin.",
        title: "Not for me",
        name: user.name || "Anonymous",
        user: user._id,
      },
      {
        rating: 5,
        comment: "Luxury in a bottle. This has become my holy grail skincare product. Worth every penny.",
        title: "Perfection",
        name: user.name || "Anonymous",
        user: user._id,
      }
    ];

    for (const product of products) {
      const reviewsWithProductId = sampleReviews.map(r => ({ ...r, product: product._id }));
      await Review.insertMany(reviewsWithProductId);
    }

    console.log(`Sample reviews seeded successfully for ${products.length} products!`);
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedReviews();
