const express = require("express");
const commonRoutes = require("./commonRoutes");



const router = express.Router();


router.use("/", commonRoutes);


module.exports = router;

