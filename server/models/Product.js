
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
    category: String,
    brand: String
  },
  { timestamps: true } // ✅ REQUIRED
);

export default mongoose.model("Product", productSchema);
