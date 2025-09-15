const express = require("express");
const {
  createSize,
  getSizes,
  getSizeById,
  updateSize,
  deleteSize
} = require("../controllers/size.controller");

const { protect } = require("../middleware/authMiddleware"); // optional auth middleware

const router = express.Router();

// Public routes
router.get("/", getSizes);
router.get("/:id", getSizeById);

// Protected routes (admin only)
router.post("/", protect, createSize);
router.put("/:id", protect, updateSize);
router.delete("/:id", protect, deleteSize);

module.exports = router;
