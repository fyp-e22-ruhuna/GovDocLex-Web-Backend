const Joi = require("joi");
const mongoose = require("mongoose");
const { assign } = require("nodemailer/lib/shared");


const userSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  userId: Joi.string().required(),

});

module.exports = { userSchema };
