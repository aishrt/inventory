const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  customer: String,
  address: String,
  city: String,
  invoiceNumber: String,
  invoiceDate: Date,
  products: [
    {
      productName: String,
      qty: Number,
      rate: Number,
      amount: Number,
    },
  ],
  total: Number,
  gst: Number,
  netAmount: Number,
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
