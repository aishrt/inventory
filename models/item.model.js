const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: String,
  itemCode: String,
  purchasePrice: Number,
  salePrice: Number,
  inStock: Number,
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
