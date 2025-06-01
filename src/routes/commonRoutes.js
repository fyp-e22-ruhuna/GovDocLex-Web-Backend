const express = require("express");
const router = express.Router();
const authController = require("../controllers/user.controller");

router.post("/login", authController.localSignIn);
router.post("/signup", authController.localSignup);
router.post("/google-auth", authController.googleAuth);

module.exports = router;
