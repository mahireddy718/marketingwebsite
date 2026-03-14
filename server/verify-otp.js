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

async function verifyCandidates() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const latest = await Otp.findOne().sort({ expiresAt: -1 });
  if (latest) {
    console.log("TARGET_HASH:", latest.otpHash);
    
    // Candidates to test
    const candidates = [
        "903540",
        "903541",
        "990805"
    ];

    for (const c of candidates) {
        if (hashOTP(c) === latest.otpHash) {
            console.log("✅ MATCH FOUND:", c);
        } else {
            console.log("❌ NO MATCH:", c);
        }
    }
  } else {
    console.log("No OTP records found.");
  }
  await mongoose.disconnect();
}

verifyCandidates();
