const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
  color: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
  size: { type: mongoose.Schema.Types.ObjectId, ref: "Size" },
  price: { type: Number, required: true }
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add a product name"] },
    description: { type: String },
    images: [{ type: String, required: true }],
    priceType: {
      type: String,
      enum: ["for_all", "for_color", "for_size", "for_color_and_size"],
      default: "for_all"
    },
    price: { type: Number }, // for 'for_all'
    variants: [variantSchema], // for other price types
    stock: { type: Number, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

// {
//   "name": "Premium T-Shirt",
//   "description": "High-quality cotton T-shirt",
//   "images": ["link1", "link2"],
//   "priceType": "for_color_and_size",
//   "variants": [
//     { "color": "Red", "size": "S", "price": 499 },
//     { "color": "Red", "size": "M", "price": 549 },
//     { "color": "Blue", "size": "S", "price": 529 }
//   ],
//   "stock": 100,
//   "category": "Apparel",
//   "tags": ["cotton", "summer", "premium"]
// }
