const express = require("express");
const cors = require("cors");
const path = require("path");
const { PORT } = require("./config/config");
const router = require("./src/routes");
require('dotenv').config();


const app = express();

app.use(cors());

app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
