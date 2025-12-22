import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isVerified: Boolean,
});

export default mongoose.model("User", userSchema);