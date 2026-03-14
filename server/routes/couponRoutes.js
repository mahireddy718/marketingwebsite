import express from "express";
import Coupon from "../models/Coupon.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /coupons
// @desc    Get all active coupons for customers
router.get("/", protect, async (req, res) => {
  try {
    const coupons = await Coupon.find({ 
      isActive: true,
      expiryDate: { $gte: new Date() }
    }).sort({ createdAt: -1 });
    
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch coupons" });
  }
});

export default router;
