const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/admin/userController");
const { NotLoggedIn } = require("../../middlewares/Adminauth");

router.get("/list", NotLoggedIn, UserController.list);
router.post("/add", NotLoggedIn, UserController.add);
router.post("/edit",NotLoggedIn, UserController.edit );


module.exports = router;
