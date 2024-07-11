const express = require("express");
const router = express.Router();
const VendorController = require("../../controllers/admin/vendorController");


router.get("/list", VendorController.list);
router.post("/add", VendorController.add);
router.get("/edit/:id", VendorController.edit);
router.post("/edit/:id", VendorController.update);

module.exports = router;
