const Joi = require('joi');
const { VALIDATION_ERROR } = require('../../constants/helper');

const validateRequest = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    VALIDATION_ERROR(res, error);
  }
};

module.exports = {
  validateRequest,
};