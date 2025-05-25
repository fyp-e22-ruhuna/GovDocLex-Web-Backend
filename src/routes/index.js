const express = require("express");
const commonRoutes = require("./commonRoutes");
const customerRoutes = require("./customerRoutes")


const router = express.Router();


router.use("/", commonRoutes);
router.use("/customer",customerRoutes);


module.exports = router;

