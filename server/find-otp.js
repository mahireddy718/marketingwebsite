import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, ".env") });

const otpSchema = new mongoose.Schema({
  contact: String,
  otpHash: String,
  expiresAt: Date,
});

const Otp = mongoose.model("Otp", otpSchema);

async function findLatest() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  const latest = await Otp.findOne().sort({ expiresAt: -1 });
  if (latest) {
    console.log("LATEST_OTP_CONTACT:", latest.contact);
    console.log("LATEST_OTP_EXPIRES:", latest.expiresAt);
    // Since it's hashed, we can't get the plain text back.
    // However, I can check the logs again or try to guess based on the '9' I saw.
    // Wait, if I can't get the plain text, then I must rely on the logs.
  } else {
    console.log("No OTP records found.");
  }
  await mongoose.disconnect();
}

findLatest();
