import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/Order.js";
import User from "../models/user.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================= CREATE RAZORPAY ORDER ================= */
router.post("/order", protect, async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paise for INR)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay Order Error:", err);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
});

/* ================= VERIFY PAYMENT ================= */
router.post("/verify", protect, async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderDetails 
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Create actual order in DB
      const newOrder = await Order.create({
        user: req.userId,
        items: orderDetails.items,
        address: orderDetails.address,
        total: orderDetails.total,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentStatus: "COMPLETED",
        status: "PLACED"
      });

      // Award Super Coins (1 coin per 1000 rupees)
      const coinsToEarn = Math.floor(orderDetails.total / 1000);
      if (coinsToEarn > 0) {
        await User.findByIdAndUpdate(req.userId, {
          $inc: { superCoins: coinsToEarn }
        });
      }

      return res.status(200).json({ 
        message: "Payment verified successfully", 
        orderId: newOrder._id,
        earnedCoins: coinsToEarn
      });
    } else {
      return res.status(400).json({ message: "Invalid signature sent!" });
    }
  } catch (err) {
    console.error("Payment Verification Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
