import mongoose from "mongoose";
import csv from "csvtojson";
import dotenv from "dotenv";
dotenv.config();

import Product from "./models/Product.js"; // adjust if your model path differs

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB error:", error);
    process.exit(1);
  }
}

async function importCSV() {
  try {
    const filePath = "./products.csv"; // keep csv inside server folder
    const jsonArray = await csv().fromFile(filePath);

    console.log("Rows parsed:", jsonArray.length);
    await Product.insertMany(jsonArray);

    console.log("Products imported successfully!");
    process.exit();
  } catch (error) {
    console.error("Import error:", error);
    process.exit(1);
  }
}

(async () => {
  await connectDB();
  await importCSV();
})();
