import fs from 'fs';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI("AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");

const base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

function testModel(modelName) {
  fs.writeFileSync("test.png", Buffer.from(base64Image, 'base64'));
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: "image/png"
    }
  };

  const model = genAI.getGenerativeModel({ model: modelName, systemInstruction: "You are a bot" });
  return model.generateContent(["What is this image?", imagePart])
    .then(res => console.log(`SUCCESS [${modelName}]:`, res.response.text()))
    .catch(err => console.error(`ERROR [${modelName}]:`, err.message));
}

(async () => {
    await testModel("gemini-2.5-flash");
    await testModel("gemini-2.0-flash");
    await testModel("gemini-2.5-flash");
})();
