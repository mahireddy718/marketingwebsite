import express from "express";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ---------- SIGNUP ----------
router.post("/signup", async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ msg: "All fields required" });
  }

  email = email.toLowerCase();

  if (!email.includes("@") || !email.includes(".")) {
    return res.json({ msg: "Invalid email format" });
  }

  if (password.length < 6) {
    return res.json({ msg: "Weak password (min 6 chars)" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.json({ msg: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashed });
  await user.save();

  return res.json({ msg: "Signup successful" });
});

// ---------- LOGIN ----------
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.json({ msg: "All fields required" });
  }

  email = email.toLowerCase();

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ msg: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ msg: "Incorrect password" });
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id }, "SECRET123", { expiresIn: "1d" });

  // 🔥 MUST return _id for frontend checkout
  return res.json({
    msg: "Login successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

export default router;
