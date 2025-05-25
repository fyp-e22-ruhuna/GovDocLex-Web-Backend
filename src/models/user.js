const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../../config/db");

mongoose.connection = connection;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "user"] },
    isPasswordChanged: { type: Boolean, default: false },
    employeeId: { type: String, required: true, unique: true },
    

  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);