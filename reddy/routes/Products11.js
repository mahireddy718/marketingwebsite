import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import Product from "../models/Product.js";

const router = express.Router();

// STORAGE FOR CSV UPLOADS
const upload = multer({ dest: "uploads/" });

/* ------------------------------------------------
   GET ALL PRODUCTS / FILTER BY CATEGORY
------------------------------------------------ */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};

    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };

    }

    const products = await Product.find(filter);
    res.json(products);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* ------------------------------------------------
   BULK UPLOAD PRODUCTS FROM CSV
------------------------------------------------ */
router.post("/bulk-upload", upload.single("file"), async (req, res) => {
  try {
    const items = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => items.push(row))
      .on("end", async () => {
        await Product.insertMany(items);

        // DELETE TEMP CSV FILE
        fs.unlinkSync(req.file.path);

        res.json({
          message: "Products uploaded successfully",
          count: items.length,
        });
      });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

