const mongoose = require("mongoose");

// Schema for variant-based pricing
const variantSchema = new mongoose.Schema({
  size: { type: String },
  color: { type: String },
  price: { type: Number, required: true }
});

// Main product schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"]
    },
    description: { type: String },
    images: [{ type: String, required: true }],
    
    // Pricing type
    priceType: {
      type: String,
      enum: ["for_all", "for_color", "for_size", "for_color_and_size"],
      default: "for_all"
    },

    // Price value(s)
    price: { type: Number },         // used for 'for_all'
    variants: [variantSchema],       // used for other types

    stock: { type: Number, default: 0 },
    category: { type: String, default: "" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

// Example product JSON structure:
// {
//   "name": "T-Shirt",
//   "description": "Comfortable cotton T-shirt",
//   "images": [
//     "https://example.com/images/tshirt-front.jpg",
//     "https://example.com/images/tshirt-back.jpg"
//   ],
//    "price": 499,
//   "variants": [
//     { "size": "S", "color": "Red", "price": 499 },
//     { "size": "M", "color": "Red", "price": 549 },
//     { "size": "L", "color": "Blue", "price": 599 }
//   ],
//   "stock": 100,
//   "category": "Apparel"
// }
