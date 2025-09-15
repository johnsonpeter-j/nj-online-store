const Category = require("../models/Category");

// @desc    Create a new category
// @route   POST /categories
exports.createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ message: "Category name is required" });

    const exists = await Category.findOne({ name });
    if (exists) return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories
// @route   GET /categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single category by ID
// @route   GET /categories/:id
exports.getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Update category by ID
// @route   PUT /categories/:id
exports.updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete category by ID
// @route   DELETE /categories/:id
exports.deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
