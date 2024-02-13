const Invoice = require("../models/invoice.model");
const catchAsync = require("../utils/catchAsync");

const addInvoice = catchAsync(async (req, res) => {
  try {
    const user = await Invoice.create(req.body);
    return res.status(200).json({
      status: "200",
      message: `Invoice Created successfully.`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while generating invoice.",
      error: error.message,
    });
  }
});

const getInvoiceList = catchAsync(async (req, res) => {
  const searchName = req.query.name;
  const query = {};
  if (searchName) {
    const searchValue = new RegExp(searchName, "i");
    query.$or = [{ products: searchValue }, { customer: searchValue }];
  }

  try {
    const totalCount = await Invoice.countDocuments(query);

    const invList = await Invoice.find(query);

    return res.status(200).json({
      status: "200",
      message: "Invoice list fetched successfully!",
      data: invList,
      count: totalCount,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while fetching invoice list!",
      error: error.message,
    });
  }
});
module.exports = {
  addInvoice,
  getInvoiceList,
};
