import 'dotenv/config';
import nodemailer from 'nodemailer';

async function testMail() {
  console.log("Testing with User:", process.env.EMAIL_USER);
  console.log("Testing with Pass:", process.env.EMAIL_PASS ? "****" : "MISSING");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ Transporter is ready to take our messages");
    
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Mail from Marketzen",
      text: "If you receive this, your SMTP settings are correct!",
    });
    
    console.log("✅ Message sent: %s", info.messageId);
  } catch (error) {
    console.error("❌ Error occurred:", error);
  }
}

testMail();
