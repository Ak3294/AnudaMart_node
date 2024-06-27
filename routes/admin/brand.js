const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const BrandController = require("../../controllers/admin/brandController");

router.get("/list", NotLoggedIn, BrandController.list);
router.post("/add", NotLoggedIn, BrandController.add);

module.exports = router;
