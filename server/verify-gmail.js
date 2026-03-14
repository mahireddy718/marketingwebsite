import 'dotenv/config';
import nodemailer from 'nodemailer';

async function verify() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ GMAIL_VERIFIED_SUCCESS");
  } catch (err) {
    console.error("❌ GMAIL_VERIFICATION_FAILED:", err.message);
  }
}
verify();
