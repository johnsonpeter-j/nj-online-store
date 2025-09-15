const Product = require("../models/Product");

// @desc    Create a new product
// @route   POST /products
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, images, priceType, price, variants, stock, category } = req.body;

    // Basic validations
    if (!name) return res.status(400).json({ message: "Product name is required" });
    if (!images || images.length === 0) return res.status(400).json({ message: "At least one image is required" });
    
    // Validate price/variants based on priceType
    switch (priceType) {
      case "for_all":
        if (price == null) return res.status(400).json({ message: "Price is required for for_all type" });
        break;
      case "for_color":
        if (!variants || variants.length === 0 || variants.some(v => !v.color || v.price == null))
          return res.status(400).json({ message: "Each variant must have color and price" });
        break;
      case "for_size":
        if (!variants || variants.length === 0 || variants.some(v => !v.size || v.price == null))
          return res.status(400).json({ message: "Each variant must have size and price" });
        break;
      case "for_color_and_size":
        if (!variants || variants.length === 0 || variants.some(v => !v.color || !v.size || v.price == null))
          return res.status(400).json({ message: "Each variant must have color, size, and price" });
        break;
      default:
        return res.status(400).json({ message: "Invalid priceType" });
    }

    const product = await Product.create({
      name,
      description,
      images,
      priceType,
      price,
      variants,
      stock,
      category
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
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product by ID
// @route   GET /products/:id
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Update product by ID
// @route   PUT /products/:id
exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, images, priceType, price, variants, stock, category } = req.body;

    // Validate priceType + variants as in createProduct
    if (priceType) {
      switch (priceType) {
        case "for_all":
          if (price == null) return res.status(400).json({ message: "Price is required for for_all type" });
          break;
        case "for_color":
          if (!variants || variants.length === 0 || variants.some(v => !v.color || v.price == null))
            return res.status(400).json({ message: "Each variant must have color and price" });
          break;
        case "for_size":
          if (!variants || variants.length === 0 || variants.some(v => !v.size || v.price == null))
            return res.status(400).json({ message: "Each variant must have size and price" });
          break;
        case "for_color_and_size":
          if (!variants || variants.length === 0 || variants.some(v => !v.color || !v.size || v.price == null))
            return res.status(400).json({ message: "Each variant must have color, size, and price" });
          break;
        default:
          return res.status(400).json({ message: "Invalid priceType" });
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, images, priceType, price, variants, stock, category },
      { new: true, runValidators: true }
    );

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product by ID
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
