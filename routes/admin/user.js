// routes/userRouter.js
const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/admin/userController');

router.get('/list', UserController.list);

module.exports = router;