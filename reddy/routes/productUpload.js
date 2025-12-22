import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import Product from "../models/Product.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload-csv", upload.single("file"), async (req, res) => {
  try {
    const products = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => products.push(row))
      .on("end", async () => {
        await Product.insertMany(products);
        fs.unlinkSync(req.file.path); // delete file
        res.json({ msg: "Products uploaded successfully", count: products.length });
      });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "CSV Upload failed" });
  }
});

export default router;
