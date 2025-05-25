const VALIDATION_ERROR = (res, error) => {
    const message = error.details && error.details[0] ? error.details[0].message : error.message || "Validation error";
    res.status(400).json({
      status: 'fail',
      message,
    });
  };
  
  module.exports = {
    VALIDATION_ERROR,
  };