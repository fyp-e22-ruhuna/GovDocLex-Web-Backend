const mongoose = require("mongoose");
const { MONGODB_URI } = require("./config");

console.log(MONGODB_URI);

const connection = mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, 

    
    
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MONGO CONNECTION ERROR!!", err);
  });

module.exports = connection;