const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const connection = require("../../config/db");

mongoose.connection = connection;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    password: {
      type: String,
      required: function () {
        return this.authMethod === "local";
      },
      minlength: 8,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    authMethod: {
      type: String,
      required: true,
      enum: ["local", "google"],
      default: "local",
    },
    isVerified: { type: Boolean, default: false },
    passwordChangedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
