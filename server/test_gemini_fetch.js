async function test() {
  try {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models?key=AIzaSyDgDo-fnEoJn-lNe0Oe817076eh5qRl6d8");
    const data = await response.json();
    const flash = data.models.find(m => m.name === "models/gemini-1.5-flash");
    console.log(JSON.stringify(flash, null, 2));
    
    console.log("ALL MODELS SUPPORTING generateContent:");
    data.models.filter(m => m.supportedGenerationMethods.includes("generateContent")).forEach(m => console.log(m.name));
  } catch (err) {
    console.error("ERROR", err);
  }
}
test();
