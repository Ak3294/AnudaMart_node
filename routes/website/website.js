const router = require("express").Router();
const websiteController = require("../../controllers/website/websiteController");
const { NotLoggedIn } = require("../../middlewares/WebAuth");

router.get("/category", websiteController.category);
router.get("/category/:parent_id", websiteController.category);
router.post(
    "/products_by_category",
    NotLoggedIn,
    websiteController.products_by_category
);
router.post(
    "/get_all_products",
    NotLoggedIn,
    websiteController.get_all_products
);
router.post(
    "/get_product_details",
    NotLoggedIn,
    websiteController.get_product_details
);

module.exports = router;
