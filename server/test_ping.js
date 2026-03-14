import fs from 'fs';

async function testAnalyze() {
  try {
    const filename = "dummy_test.jpg";
    fs.writeFileSync(filename, "hello image bytes");
    
    const fileData = fs.readFileSync(filename);
    const blob = new Blob([fileData], { type: 'image/jpeg' });
    const form = new FormData();
    form.append('image', blob, filename);
    
    console.log("Sending request to /api/ai/analyze-skin...");
    const res = await fetch("http://localhost:4002/api/ai/analyze-skin", {
      method: 'POST',
      body: form
    });
    
    const text = await res.text();
    console.log("STATUS:", res.status);
    try {
        console.log("RESPONSE DATA:", JSON.parse(text));
    } catch {
        console.log("RESPONSE TEXT:", text);
    }
    
  } catch (err) {
    console.error("ERROR:", err.message);
  } finally {
    if (fs.existsSync("dummy_test.jpg")) fs.unlinkSync("dummy_test.jpg");
  }
}
testAnalyze();
