const Tag = require("../models/Tag");
const Category = require("../models/Category");

// @desc    Create a new tag
// @route   POST /tags
exports.createTag = async (req, res, next) => {
  try {
    const { name, description, category } = req.body;

    if (!name) return res.status(400).json({ message: "Tag name is required" });
    if (!category) return res.status(400).json({ message: "Category is required for tag" });

    // Validate category
    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(404).json({ message: "Category not found" });

    // Check if tag already exists
    const exists = await Tag.findOne({ name });
    if (exists) return res.status(400).json({ message: "Tag already exists" });

    const tag = await Tag.create({ name, description, category });
    res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tags
// @route   GET /tags
exports.getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find().populate("category", "name description");
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

// @desc    Get tag by ID
// @route   GET /tags/:id
exports.getTagById = async (req, res, next) => {
  try {
    const tag = await Tag.findById(req.params.id).populate("category", "name description");
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

// @desc    Update tag by ID
// @route   PUT /tags/:id
exports.updateTag = async (req, res, next) => {
  try {
    const { category } = req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) return res.status(404).json({ message: "Category not found" });
    }

    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate("category", "name description");

    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json(tag);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete tag by ID
// @route   DELETE /tags/:id
exports.deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    next(error);
  }
};
