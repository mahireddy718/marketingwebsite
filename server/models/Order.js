// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
//     items: [
//       {
//         productId: String,
//         name: String,
//         price: Number,
//         quantity: Number,
//       },
//     ],
//     total: { type: Number, required: true },
//     address: {
//       fullName: String,
//       phone: String,
//       street: String,
//       city: String,
//       state: String,
//       pincode: String,
//     },
//     razorpayOrderId: String,
//     razorpayPaymentId: String,
//     status: { type: String, enum: ["PAID", "FAILED"], default: "PAID" },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    address: {
      type: Object, // snapshot of address at order time
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "PLACED",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
