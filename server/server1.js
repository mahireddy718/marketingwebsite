import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Routes
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/productRoutes.js";
import productsRoutes from "./routes/Products11.js";
import productUpload from "./routes/productUpload.js";
import addressRoutes from "./routes/addressRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

import { Server } from "socket.io";
import http from "http";
import Message from "./models/Message.js";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "https://ecommerce-7lph.vercel.app",
      "https://ecommerce-taupe-omega-29.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.io logic
io.on("connection", (socket) => {
  console.log("⚡ User Connected:", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`👤 User joined room: ${data}`);
  });

  socket.on("send_message", async (data) => {
    const { sender, receiver, message, senderName, isAdmin, room } = data;
    
    try {
      const newMessage = new Message({
        sender,
        receiver,
        senderName,
        message,
        isAdmin,
        room
      });
      await newMessage.save();
      
      socket.to(room).emit("receive_message", newMessage);
      socket.to("admin").emit("receive_message", newMessage);
    } catch (err) {
      console.error("❌ Error saving message:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("👋 User Disconnected", socket.id);
  });
});

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://ecommerce-7lph.vercel.app",
    "https://ecommerce-taupe-omega-29.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Routes Registration
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/products", productsRoutes);
app.use("/coupons", couponRoutes);
app.use("/admin", productUpload);
app.use("/api/address", addressRoutes);
app.use("/api/admin", adminRoutes);
app.use("/orders", orderRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/payment", paymentRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/reviews", reviewRoutes);

// Get chat history for a room
app.get("/api/chat/:room", async (req, res) => {
  try {
    const messages = await Message.find({ room: req.params.room }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching chat history" });
  }
});

// Health Check
app.get("/", (req, res) => res.send("API running"));

// Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 4001;
httpServer.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
