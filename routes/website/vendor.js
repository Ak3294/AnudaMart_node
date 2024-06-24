const router = require("express").Router();
const VendorController = require("../../controllers/website/vendorController");

router.post("/register", VendorController.register);

module.exports = router;
