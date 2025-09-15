const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Color name is required"],
      unique: true,
      trim: true
    },
    hexCode: {
      type: String, // optional hex code like "#FF0000"
      default: null
    },
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
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Color", colorSchema);
