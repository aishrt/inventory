const csv = require("csv-parser");
const Item = require("../models/item.model"); // Assuming the schema is defined in itemModel.js

// Function to upload items from CSV to MongoDB
const uploadItemsFromCSV = (csvData) => {
  if (!csvData) {
    console.error("CSV data is required");
    return;
  }

  // Convert CSV data string to Readable Stream
  const stream = require("stream");
  const csvStream = new stream.PassThrough();
  csvStream.end(csvData);

  csvStream
    .pipe(csv())
    .on("data", (row) => {
      const item = new Item({
        itemName: row["Item name*"],
        itemCode: row["Item code"],
        purchasePrice: parseFloat(row["Purchase"]),
        salePrice: parseFloat(row["Sale Price"]),
        inStock: parseInt(row["In stock"]),
      });

      item
        .save()
        .then(() => console.log("Item saved to MongoDB"))
        .catch((err) => console.error("Error saving item:", err));
    })
    .on("end", () => {
      console.log("CSV data successfully processed");
    });
};

module.exports = {
  uploadItemsFromCSV,
};

// const fs = require("fs");
// const csv = require("csv-parser");
// const Item = require("../models/item.model"); // Assuming the schema is defined in itemModel.js

// // Function to upload items from CSV to MongoDB
// const uploadItemsFromCSV = (filePath) => {
//   console.log(filePath, "filePath");
//   fs.createReadStream("filePath")
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
//       console.log("CSV file successfully processed");
//     });
// };

// module.exports = {
//   uploadItemsFromCSV,
// };
