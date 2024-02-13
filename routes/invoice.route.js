const express = require("express");
const router = express.Router();
const { invoiceController } = require("../controllers");
const auth = require("../middlewares/auth");

router.post("/add", invoiceController.addInvoice);
router.get("/list", invoiceController.getInvoiceList);

module.exports = router;
