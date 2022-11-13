const { validationResult } = require('express-validator');
const HTTP_CODE = require('../utils/httpCode');

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(HTTP_CODE.UNPROCESSABLE_ENTITY).json({ errors: error.array() });
  }
};

module.exports = { validateResult };
