import express from "express";
import Order from "../models/Order.js";
import User from "../models/user.js";
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

    // Award Super Coins (1 coin per 1000 rupees)
    const coinsToEarn = Math.floor(total / 1000);
    if (coinsToEarn > 0) {
      await User.findByIdAndUpdate(req.userId, {
        $inc: { superCoins: coinsToEarn }
      });
    }

    res.status(201).json({ ...order._doc, earnedCoins: coinsToEarn });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Order failed" });
  }
});

/* GET USER ORDERS */
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* GET SINGLE ORDER DETAILS */
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error("Fetch order details error:", err);
    res.status(500).json({ message: "Failed to fetch order details" });
  }
});

export default router;
