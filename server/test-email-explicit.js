import 'dotenv/config';
import nodemailer from 'nodemailer';

async function testMailExplicit() {
  console.log("Testing Explicit SMTP with User:", process.env.EMAIL_USER);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Adding some debug options
    debug: true,
    logger: true
  });

  try {
    await transporter.verify();
    console.log("✅ Explicit Transporter is ready");
    
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Test Mail Explicit from Marketzen",
      text: "Testing explicit SMTP settings.",
    });
    
    console.log("✅ Message sent: %s", info.messageId);
  } catch (error) {
    console.error("❌ Explicit Error occurred:", error);
  }
}

testMailExplicit();
