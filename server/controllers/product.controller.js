const Product = require("../models/Product");
const Category = require("../models/Category");
const Tag = require("../models/Tag");
const Color = require("../models/Color");
const Size = require("../models/Size");

// Helper to validate variant references
const validateVariants = async (variants) => {
  for (const v of variants) {
    if (v.color) {
      const colorExists = await Color.findById(v.color);
      if (!colorExists) throw new Error(`Color ${v.color} not found`);
    }
    if (v.size) {
      const sizeExists = await Size.findById(v.size);
      if (!sizeExists) throw new Error(`Size ${v.size} not found`);
    }
    if (typeof v.price !== "number") throw new Error("Variant price must be a number");
  }
};

// @desc    Create product
// @route   POST /products
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, images, priceType, price, variants, stock, category, tags } = req.body;

    // Validate category
    const categoryExists = await Category.findById(category);
    if (!categoryExists) return res.status(404).json({ message: "Category not found" });

    // Validate tags
    if (tags && tags.length > 0) {
      for (const tagId of tags) {
        const tagExists = await Tag.findById(tagId);
        if (!tagExists) return res.status(404).json({ message: `Tag ${tagId} not found` });
      }
    }

    // Validate variants
    if (["for_color", "for_size", "for_color_and_size"].includes(priceType)) {
      if (!variants || !Array.isArray(variants) || variants.length === 0)
        return res.status(400).json({ message: "Variants are required for this price type" });
      await validateVariants(variants);
    }

    const product = await Product.create({
      name, description, images, priceType, price, variants, stock, category, tags
    });

    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all products
// @route   GET /products
exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
      .populate("category", "name description")
      .populate("tags", "name description category")
      .populate("variants.color", "name hexCode category tags")
      .populate("variants.size", "name description attributes category tags");
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get product by ID
// @route   GET /products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category", "name description")
      .populate("tags", "name description category")
      .populate("variants.color", "name hexCode category tags")
      .populate("variants.size", "name description attributes category tags");

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update product
// @route   PUT /products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const { category, tags, variants, priceType } = req.body;

    // Validate category
    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) return res.status(404).json({ message: "Category not found" });
    }

    // Validate tags
    if (tags && tags.length > 0) {
      for (const tagId of tags) {
        const tagExists = await Tag.findById(tagId);
        if (!tagExists) return res.status(404).json({ message: `Tag ${tagId} not found` });
      }
    }

    // Validate variants
    if (["for_color", "for_size", "for_color_and_size"].includes(priceType)) {
      if (variants && variants.length > 0) await validateVariants(variants);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product
// @route   DELETE /products/:id
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    next(error);
  }
};
