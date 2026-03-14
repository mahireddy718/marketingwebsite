import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");

async function list() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8`);
    const data = await response.json();
    console.log("AVAILABLE MODELS:");
    data.models.forEach(m => console.log(m.name));
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}
list();
