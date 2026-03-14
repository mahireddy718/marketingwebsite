import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import Product from "../models/Product.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/bulk-upload", upload.single("file"), async (req, res) => {
  try {
    const products = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => {
        // Data cleaning and validation
        if (row.price) row.price = parseFloat(row.price) || 0;
        products.push(row);
      })
      .on("end", async () => {
        try {
          await Product.insertMany(products);
          fs.unlinkSync(req.file.path); // delete file
          res.json({ 
            msg: "Products uploaded successfully", 
            total: products.length,
            message: `Successfully imported ${products.length} products.`
          });
        } catch (dbErr) {
          console.error("Database insert error:", dbErr);
          res.status(500).json({ msg: "Database insertion failed", error: dbErr.message });
        }
      });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "CSV Upload failed", error: err.message });
  }
});

export default router;
