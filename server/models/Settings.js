import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: mongoose.Schema.Types.Mixed,
  group: { type: String, default: "general" }
}, { timestamps: true });

export default mongoose.model("Settings", settingsSchema);
