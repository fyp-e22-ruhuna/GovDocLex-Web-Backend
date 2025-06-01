const express = require("express");


const userController = require("../controllers/user.controller");
const commonController = require("../controllers/common.Controller");


const { checkAdminToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/pin",userController.pinmessage);


module.exports = router;