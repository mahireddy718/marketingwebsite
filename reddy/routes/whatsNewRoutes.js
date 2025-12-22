import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 🔥 WHAT'S NEW — latest products
router.get("/whats-new", async (req, res) => {
  try {
    const products = await Product
      .find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
