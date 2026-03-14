// controllers/paymentController.js
import crypto from "crypto";
import Order from "../models/Order.js";

async function getRazorpayInstance() {
  try {
    const mod = await import("razorpay");
    const RazorpayCtor = mod.default || mod;
    return new RazorpayCtor({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  } catch (err) {
    // SDK not installed or failed to load — caller will fallback to mock behavior
    return null;
  }
}

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const razorpay = await getRazorpayInstance();

    if (razorpay) {
      const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
      });
      return res.json(order);
    }

    // Mock order when razorpay SDK is unavailable (local dev)
    const mockOrder = {
      id: `order_mock_${Date.now()}`,
      amount: amount * 100,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      status: "created",
    };

    return res.json(mockOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// VERIFY PAYMENT
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData, // sent from frontend
    } = req.body;

    // compute expected signature using secret from env
    const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }

    // Save order record
    const savedOrder = await Order.create({
      userId: orderData.userId,
      items: orderData.items,
      total: orderData.total,
      address: orderData.address,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      status: "PAID",
    });

    res.json({ success: true, orderId: savedOrder._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

