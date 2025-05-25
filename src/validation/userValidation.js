const Joi = require("joi");
const mongoose = require("mongoose");
const { assign } = require("nodemailer/lib/shared");


const userSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  role: Joi.string().valid("admin", "user").required(),
  phoneNumber: Joi.string().required(),
  employeeId: Joi.string().required(),

});

module.exports = { userSchema };
