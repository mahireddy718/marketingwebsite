import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isVerified: Boolean,
  role: { type: String, default: "customer", enum: ["customer", "admin", "manager", "vendor"] },
  superCoins: { type: Number, default: 0 },
});

export default mongoose.model("User", userSchema);