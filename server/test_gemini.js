import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const res = await model.generateContent("Test message");
    console.log(res.response.text());
  } catch (err) {
    console.error("ERROR MESSAGE:", err.message);
    if (err.status) console.error("STATUS:", err.status);
    if (err.response) console.error("RESPONSE:", err.response);
  }
}
test();
