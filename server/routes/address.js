import express from "express";

const router = express.Router();

// Legacy file replaced. Use /api/address (addressRoutes.js) for address APIs.
router.use((req, res) => {
  res.status(410).json({ success: false, error: "Deprecated route. Use /api/address." });
});

export default router;
