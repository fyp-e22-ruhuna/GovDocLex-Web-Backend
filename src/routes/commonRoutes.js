const express = require("express");
const router = express.Router();
const authController = require("../controllers/user.controller");
const chatController = require("../controllers/chatController");

router.post("/login", authController.localSignIn);
router.post("/signup", authController.localSignup);
router.post("/google-auth", authController.googleAuth);
router.post('/ask', chatController.handleQuestion);

module.exports = router;
