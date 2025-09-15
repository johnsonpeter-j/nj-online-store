const mongoose = require("mongoose");

const attributeSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
});

const sizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Size name is required"],
      unique: true,
      trim: true
    },
    description: { type: String, default: null },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: false
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
      }
    ],
    attributes: [attributeSchema] // array of { key, value } for custom type
  },
  { timestamps: true }
);

module.exports = mongoose.model("Size", sizeSchema);

// {
//   "name": "Custom Large",
//   "description": "Custom measurements",
//   "attributes": [
//     { "key": "chest", "value": "42 inch" },
//     { "key": "length", "value": "30 inch" },
//     { "key": "sleeve", "value": "25 inch" }
//   ]
// }