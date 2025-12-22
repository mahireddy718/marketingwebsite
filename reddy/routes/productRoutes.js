import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

/* ================= SEARCH PRODUCTS ================= */
/* ================= SMART SEARCH ================= */
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q?.toLowerCase();

    if (!q) return res.json([]);

    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
        { tags: { $in: [q] } }
      ],
    })
      .limit(10)
      .select("name price image category");

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
});


/* ================= GET PRODUCT BY ID ================= */
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Invalid product ID" });
  }
});

export default router;
