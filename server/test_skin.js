import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

const genAI = new GoogleGenerativeAI("AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");

function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
}

async function test() {
  try {
    // create dummy text file to act as an image
    fs.writeFileSync("dummy.jpg", "hello image bytes");
    
    const imagePart = fileToGenerativePart("dummy.jpg", "image/jpeg");
    const systemInstruction = `You are a professional AI Dermatologist. Reply JSON.`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", systemInstruction });
    const result = await model.generateContent(["Analyze this", imagePart]);
    console.log("SUCCESS:", result.response.text());
  } catch (err) {
    console.error("ERROR:", err.message);
  } finally {
    if (fs.existsSync("dummy.jpg")) fs.unlinkSync("dummy.jpg");
  }
}
test();
