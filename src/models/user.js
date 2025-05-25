const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../../config/db");

mongoose.connection = connection;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    userId:{type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isPasswordChanged: { type: Boolean, default: false },
  
    

  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);