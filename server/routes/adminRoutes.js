import express from "express";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/user.js";

const router = express.Router();

// Get dashboard metrics
router.get("/metrics", async (req, res) => {
  try {
    const totalSales = await Order.countDocuments({ status: "PAID" }); // Adjust status as needed
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: "customer" });

    // Revenue calculation
    const orders = await Order.find({ status: "PAID" });
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

    // Sales Trends (last 7 days - simple mock for now, can be improved with aggregation)
    const salesTrends = [
      { name: "Mon", sales: 400 },
      { name: "Tue", sales: 300 },
      { name: "Wed", sales: 600 },
      { name: "Thu", sales: 800 },
      { name: "Fri", sales: 500 },
      { name: "Sat", sales: 900 },
      { name: "Sun", sales: 700 },
    ];

    res.json({
      totalSales,
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      salesTrends
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Get all orders
router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Update order status
router.put("/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Get all customers
router.get("/customers", async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Categories
router.get("/categories", async (req, res) => {
  try {
    const Category = (await import("../models/Category.js")).default;
    const categories = await Category.find().sort({ order: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.post("/categories", async (req, res) => {
  try {
    const Category = (await import("../models/Category.js")).default;
    const category = await Category.create(req.body);
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.delete("/categories/:id", async (req, res) => {
  try {
    const Category = (await import("../models/Category.js")).default;
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Coupons
router.get("/coupons", async (req, res) => {
  try {
    const Coupon = (await import("../models/Coupon.js")).default;
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.json(coupons);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.post("/coupons", async (req, res) => {
  try {
    const Coupon = (await import("../models/Coupon.js")).default;
    const coupon = await Coupon.create(req.body);
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.delete("/coupons/:id", async (req, res) => {
  try {
    const Coupon = (await import("../models/Coupon.js")).default;
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: "Coupon deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Products management
router.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Settings
router.get("/settings", async (req, res) => {
  try {
    const Settings = (await import("../models/Settings.js")).default;
    const settings = await Settings.find();
    const settingsMap = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsMap);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

router.post("/settings", async (req, res) => {
  try {
    const Settings = (await import("../models/Settings.js")).default;
    const { settings } = req.body; // Expecting { key: value, ... }
    
    for (const [key, value] of Object.entries(settings)) {
      await Settings.findOneAndUpdate(
        { key },
        { value },
        { upsert: true }
      );
    }
    
    res.json({ message: "Settings updated" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// Support Chat: Get all users who have chat history
router.get("/chat-users", async (req, res) => {
  try {
    const Message = (await import("../models/Message.js")).default;
    // Get unique users who have sent messages, with their latest message
    const users = await Message.aggregate([
      { $sort: { timestamp: -1 } },
      {
        $group: {
          _id: "$room",
          senderName: { $first: "$senderName" },
          lastMessage: { $first: "$message" },
          timestamp: { $first: "$timestamp" }
        }
      },
      { $sort: { timestamp: -1 } }
    ]);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
