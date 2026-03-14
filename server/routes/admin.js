import express from "express";
import { adminAuth } from "../middleware/adminAuth.js";
import { createProduct, getProducts } from "../controllers/adminController.js";

const router = express.Router();

router.post("/product", adminAuth, createProduct);
router.get("/product", adminAuth, getProducts);

export default router;
