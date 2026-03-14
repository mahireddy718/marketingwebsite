import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");

async function test(modelName) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const res = await model.generateContent("Test message");
    console.log(`SUCCESS ${modelName}:`, res.response.text());
  } catch (err) {
    console.error(`ERROR ${modelName}:`, err.message);
  }
}

async function run() {
  await test("gemini-2.5-flash");
  await test("gemini-2.5-flash");
}
run();
