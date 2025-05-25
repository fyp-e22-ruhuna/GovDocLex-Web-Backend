const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../../config/db");
const { required } = require("joi");

mongoose.connection = connection;

const customerSchema = new Schema(
  {
    customername: { type: String, required: true, unique: true },
    emailAddress: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Customer", customerSchema);
