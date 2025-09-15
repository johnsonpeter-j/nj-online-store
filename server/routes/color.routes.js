const express = require("express");
const {
  createColor,
  getColors,
  getColorById,
  updateColor,
  deleteColor
} = require("../controllers/color.controller");

const { protect } = require("../middleware/authMiddleware"); // optional auth middleware

const router = express.Router();

// Public routes
router.get("/", getColors);
router.get("/:id", getColorById);

// Protected routes (admin only)
router.post("/", protect, createColor);
router.put("/:id", protect, updateColor);
router.delete("/:id", protect, deleteColor);

module.exports = router;
