import 'dotenv/config';
import nodemailer from 'nodemailer';

async function diagnose() {
  const user = process.env.EMAIL_USER?.trim();
  const pass = process.env.EMAIL_PASS?.trim();

  console.log("--- SMTP DIAGNOSTICS ---");
  console.log(`User: [${user}] (Length: ${user?.length})`);
  console.log(`Pass: [${pass ? "****" : "MISSING"}] (Length: ${pass?.length})`);
  
  const configs = [
    {
      name: "Standard Gmail (465/SSL)",
      service: "gmail",
      auth: { user, pass }
    },
    {
      name: "Explicit Gmail (587/TLS)",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // TLS
      auth: { user, pass }
    }
  ];

  for (const config of configs) {
    console.log(`\nTesting Config: ${config.name}...`);
    const transporter = nodemailer.createTransport(config);
    try {
      await transporter.verify();
      console.log(`✅ ${config.name} VERIFIED!`);
      
      const info = await transporter.sendMail({
        from: user,
        to: user,
        subject: `SMTP Test: ${config.name}`,
        text: "The server successfully connected and sent this mail."
      });
      console.log(`✅ Mail Sent: ${info.messageId}`);
      return; // Exit if any succeed
    } catch (err) {
      console.log(`❌ ${config.name} FAILED:`);
      console.log(`   Code: ${err.code}`);
      console.log(`   Message: ${err.message}`);
      if (err.response) console.log(`   Response: ${err.response}`);
    }
  }
}

diagnose();
