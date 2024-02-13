const csv = require("csv-parser");
const Item = require("../models/item.model"); // Assuming the schema is defined in itemModel.js
const catchAsync = require("../utils/catchAsync");

// const uploadItemsFromCSV = (csvData) => {
//   if (!csvData) {
//     console.error("CSV data is required");
//     return;
//   }
//   const stream = require("stream");
//   const csvStream = new stream.PassThrough();
//   csvStream.end(csvData);

//   csvStream
//     .pipe(csv())
//     .on("data", (row) => {
//       const item = new Item({
//         itemName: row["Item name*"],
//         itemCode: row["Item code"],
//         purchasePrice: parseFloat(row["Purchase"]),
//         salePrice: parseFloat(row["Sale Price"]),
//         inStock: parseInt(row["In stock"]),
//       });

//       item
//         .save()
//         .then(() => console.log("Item saved to MongoDB"))
//         .catch((err) => console.error("Error saving item:", err));
//     })
//     .on("end", () => {
//       console.log("CSV data successfully processed");
//     });
// };

const uploadItemsFromCSV = (csvData) => {
  if (!csvData) {
    console.error("CSV data is required");
    return;
  }

  const stream = require("stream");
  const csvStream = new stream.PassThrough();
  csvStream.end(csvData);

  csvStream
    .pipe(csv())
    .on("data", async (row) => {
      const itemCode = row["Item code"];
      const itemName = row["Item name*"];

      let item = await Item.findOne({ itemCode });

      if (!item && itemName) {
        item = await Item.findOne({ itemName });
      }

      if (item) {
        // Update existing item
        item.itemName = itemName || item.itemName;
        item.purchasePrice = parseFloat(row["Purchase"]) || item.purchasePrice;
        item.salePrice = parseFloat(row["Sale Price"]) || item.salePrice;
        item.inStock = parseInt(row["In stock"]) || item.inStock;
      } else {
        // Create new item
        item = new Item({
          itemName: itemName || "",
          itemCode: itemCode || "",
          purchasePrice: parseFloat(row["Purchase"]) || 0,
          salePrice: parseFloat(row["Sale Price"]) || 0,
          inStock: parseInt(row["In stock"]) || 0,
        });
      }

      item
        .save()
        .then(() => console.log("Item saved to MongoDB"))
        .catch((err) => console.error("Error saving item:", err));
    })
    .on("end", () => {
      console.log("CSV data successfully processed");
    });
};

const getItemList = catchAsync(async (req, res) => {
  const searchName = req.query.name;

  console.log(searchName, "sadasdasdasdasdasd");
  const query = {};
  if (searchName) {
    const searchValue = new RegExp(searchName, "i");
    query.$or = [{ itemName: searchValue }, { itemCode: searchValue }];
  }

  try {
    const totalCount = await Item.countDocuments(query);

    const invList = await Item.find(query);

    return res.status(200).json({
      status: "200",
      message: "Item list fetched successfully!",
      count: totalCount,
      data: invList,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while fetching invoice list!",
      error: error.message,
    });
  }
});

// -------------------- Update Item ------------------
const updateItem = catchAsync(async (req, res) => {
  try {
    const userId = req.params.id;
    const userDetail = await Item.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });
    userDetail.save();
    return res.status(200).json({
      status: "200",
      message: "Item data updated successfully!",
      data: userDetail,
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while updating item data !",
      error: error.message,
    });
  }
});

// ------------------------ Delete Item ------------------
const deleteItem = catchAsync(async (req, res) => {
  try {
    const userId = req.params.id;
    await Item.findOneAndDelete({ _id: userId });
    return res.status(200).json({
      status: "200",
      message: "User deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "500",
      message: "An error occurred while deleting user data !",
      error: error.message,
    });
  }
});

module.exports = {
  uploadItemsFromCSV,
  getItemList,
  updateItem,
  deleteItem,
};
