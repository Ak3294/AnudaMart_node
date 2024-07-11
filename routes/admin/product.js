const router = require("express").Router();
const { NotLoggedIn } = require("../../middlewares/Adminauth");
const ProductController = require("../../controllers/admin/productController");

router.get("/list", NotLoggedIn, ProductController.list);
router.get("/add", NotLoggedIn, ProductController.addGet);
router.post('/get-attribute-values', ProductController.getAttributeValues);
router.post("/add", NotLoggedIn, ProductController.add_product);

// router.post("/edit", NotLoggedIn, ProductController.edit);
// router.post("/delete", NotLoggedIn, ProductController.delete);

module.exports = router;
