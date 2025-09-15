const Color = require("../models/Color");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

// @desc    Create a new color
// @route   POST /colors
exports.createColor = async (req, res, next) => {
  try {
    const { name, hexCode, category, tags } = req.body;

    if (!name) return res.status(400).json({ message: "Color name is required" });

    const exists = await Color.findOne({ name });
    if (exists) return res.status(400).json({ message: "Color already exists" });

    // Validate category if provided
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) return res.status(404).json({ message: "Category not found" });
    }

    // Validate tags if provided
    if (tags && (!Array.isArray(tags) || tags.length === 0)) {
      return res.status(400).json({ message: "Tags must be a non-empty array of IDs" });
    }

    const color = await Color.create({ name, hexCode, category, tags });
    res.status(201).json(color);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all colors
// @route   GET /colors
exports.getColors = async (req, res, next) => {
  try {
    const colors = await Color.find()
      .populate("category", "name description")
      .populate("tags", "name description category");
    res.status(200).json(colors);
  } catch (error) {
    next(error);
  }
};

// @desc    Get color by ID
// @route   GET /colors/:id
exports.getColorById = async (req, res, next) => {
  try {
    const color = await Color.findById(req.params.id)
      .populate("category", "name description")
      .populate("tags", "name description category");
    if (!color) return res.status(404).json({ message: "Color not found" });
    res.status(200).json(color);
  } catch (error) {
    next(error);
  }
};

// @desc    Update color by ID
// @route   PUT /colors/:id
exports.updateColor = async (req, res, next) => {
  try {
    const { category, tags } = req.body;

    // Validate category if provided
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) return res.status(404).json({ message: "Category not found" });
    }

    // Validate tags if provided
    if (tags && (!Array.isArray(tags) || tags.length === 0)) {
      return res.status(400).json({ message: "Tags must be a non-empty array of IDs" });
    }

    const color = await Color.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate("category", "name description")
      .populate("tags", "name description category");

    if (!color) return res.status(404).json({ message: "Color not found" });
    res.status(200).json(color);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete color by ID
// @route   DELETE /colors/:id
exports.deleteColor = async (req, res, next) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) return res.status(404).json({ message: "Color not found" });
    res.status(200).json({ message: "Color deleted successfully" });
  } catch (error) {
    next(error);
  }
};
