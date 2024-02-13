const express = require("express");
const router = express.Router();
const csv = require("csv-parser");
const { uploadItemsFromCSV } = require("../controllers/item.controller");
const multer = require("multer");

// Configure multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle CSV upload
router.post("/upload-csv", upload.single("filePath"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const csvDatapath = req.file; // Convert buffer to string
  const csvData = req.file.buffer.toString(); // Convert buffer to string
  uploadItemsFromCSV(csvData);

  // Sending response to the client
  res.status(200).json({ message: "CSV file upload initiated" });
});

module.exports = router;
