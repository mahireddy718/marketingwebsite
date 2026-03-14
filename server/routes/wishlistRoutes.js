import express from "express";
import Wishlist from "../models/Wishlist.js";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const router = express.Router();

// Middleware to protect routes
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// @route   GET /wishlist
// @desc    Get user's wishlist
router.get("/", auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.userId });
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.userId, products: [] });
    }
    
    // Safe filtering of IDs to avoid CastError
    const validProductIds = wishlist.products.filter(id => mongoose.Types.ObjectId.isValid(id));
    const products = await Product.find({ _id: { $in: validProductIds } });
    res.json(products);
  } catch (err) {
    console.error("Wishlist fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

// @route   POST /wishlist/toggle
// @desc    Add/Remove product from wishlist
router.post("/toggle", auth, async (req, res) => {
  try {
    const { productId } = req.body;
    console.log("Toggle Wishlist - User:", req.userId, "Product:", productId);
    
    if (!productId) {
      return res.status(400).json({ msg: "Product ID is required" });
    }

    let wishlist = await Wishlist.findOne({ user: req.userId });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.userId, products: [productId] });
      return res.json({ msg: "Added to wishlist", added: true });
    }

    const index = wishlist.products.indexOf(productId);
    if (index === -1) {
      wishlist.products.push(productId);
      await wishlist.save();
      res.json({ msg: "Added to wishlist", added: true });
    } else {
      wishlist.products.splice(index, 1);
      await wishlist.save();
      res.json({ msg: "Removed from wishlist", added: false });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
