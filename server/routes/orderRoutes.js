import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* PLACE ORDER */
router.post("/", protect, async (req, res) => {
  try {
    const { items, address, total } = req.body;

    if (!items?.length || !address || !total) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const order = await Order.create({
      user: req.userId,
      items,
      address,
      total,
    });

    res.status(201).json(order);
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Order failed" });
  }
});

export default router;
