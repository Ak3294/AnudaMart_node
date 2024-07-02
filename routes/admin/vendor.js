// routes/userRouter.js
const express = require("express");
const router = express.Router();
const VendorController = require("../../controllers/admin/vendorController");

router.get("/list", VendorController.list);
// router.get("/EditVendor", VendorController.editVendor);
router.get('/editvendor',VendorController.editVendorForm);

module.exports = router;
