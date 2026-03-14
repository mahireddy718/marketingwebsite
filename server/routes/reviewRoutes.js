import express from "express";
import Review from "../models/Review.js";

const router = express.Router();

// Get reviews for a product
router.get("/product/:productId", async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reviews" });
  }
});

// Post a review
router.post("/", async (req, res) => {
  const { productId, userId, username, rating, comment, title } = req.body;
  try {
    const newReview = new Review({
      product: productId,
      user: userId,
      username,
      rating,
      comment,
      title
    });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(500).json({ message: "Error saving review" });
  }
});

export default router;
