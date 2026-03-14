import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  contact: String,
  otpHash: String,
  expiresAt: Date,
});

export default mongoose.model("Otp", otpSchema);