const Size = require("../models/Size");
const Category = require("../models/Category");
const Tag = require("../models/Tag");

// @desc    Create a new size
// @route   POST /sizes
exports.createSize = async (req, res, next) => {
  try {
    const { name, description, category, tags, attributes } = req.body;

    if (!name) return res.status(400).json({ message: "Size name is required" });

    const exists = await Size.findOne({ name });
    if (exists) return res.status(400).json({ message: "Size already exists" });

    // Validate category if provided
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) return res.status(404).json({ message: "Category not found" });
    }

    // Validate tags if provided
    if (tags && (!Array.isArray(tags) || tags.length === 0))
      return res.status(400).json({ message: "Tags must be a non-empty array of IDs" });

    // Validate attributes
    if (attributes && (!Array.isArray(attributes) || attributes.some(a => !a.key || !a.value)))
      return res.status(400).json({ message: "Attributes must be an array of { key, value } objects" });

    const size = await Size.create({ name, description, category, tags, attributes });
    res.status(201).json(size);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all sizes
// @route   GET /sizes
exports.getSizes = async (req, res, next) => {
  try {
    const sizes = await Size.find()
      .populate("category", "name description")
      .populate("tags", "name description category");
    res.status(200).json(sizes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get size by ID
// @route   GET /sizes/:id
exports.getSizeById = async (req, res, next) => {
  try {
    const size = await Size.findById(req.params.id)
      .populate("category", "name description")
      .populate("tags", "name description category");
    if (!size) return res.status(404).json({ message: "Size not found" });
    res.status(200).json(size);
  } catch (error) {
    next(error);
  }
};

// @desc    Update size by ID
// @route   PUT /sizes/:id
exports.updateSize = async (req, res, next) => {
  try {
    const { category, tags, attributes } = req.body;

    // Validate category if provided
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) return res.status(404).json({ message: "Category not found" });
    }

    // Validate tags if provided
    if (tags && (!Array.isArray(tags) || tags.length === 0))
      return res.status(400).json({ message: "Tags must be an array of IDs" });

    // Validate attributes if provided
    if (attributes && (!Array.isArray(attributes) || attributes.some(a => !a.key || !a.value)))
      return res.status(400).json({ message: "Attributes must be an array of { key, value } objects" });

    const size = await Size.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate("category", "name description")
      .populate("tags", "name description category");

    if (!size) return res.status(404).json({ message: "Size not found" });
    res.status(200).json(size);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete size by ID
// @route   DELETE /sizes/:id
exports.deleteSize = async (req, res, next) => {
  try {
    const size = await Size.findByIdAndDelete(req.params.id);
    if (!size) return res.status(404).json({ message: "Size not found" });
    res.status(200).json({ message: "Size deleted successfully" });
  } catch (error) {
    next(error);
  }
};
