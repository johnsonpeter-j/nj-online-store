const express = require("express");
const {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag
} = require("../controllers/tag.controller");

const { protect } = require("../middleware/authMiddleware"); // optional auth middleware

const router = express.Router();

// Public routes
router.get("/", getTags);
router.get("/:id", getTagById);

// Protected routes (admin only)
router.post("/", protect, createTag);
router.put("/:id", protect, updateTag);
router.delete("/:id", protect, deleteTag);

module.exports = router;
