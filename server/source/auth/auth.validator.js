/**
 * Enlaces de referencia
 * https://github.com/validatorjs/validator.js
 * https://express-validator.github.io/docs/
 * https://express-validator.github.io/docs/custom-error-messages.html
 */
const { check } = require('express-validator');
const { validateResult } = require('../../utils/validate_helper');

const validateRegister = [
  check('username')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .not()
    .isEmpty()
    .withMessage('name field cannot be empty')
    .isLength({ min: 3 })
    .bail()
    .withMessage('name field must have at least 3 letters')
    .isString()
    .withMessage('name field must be a string'),

  check('email')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .isEmail()
    .withMessage('email field must be formatted as an email string')
    .bail(),

  check('password')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .not()
    .isEmpty()
    .withMessage('password field cannot be empty')
    .isLength({ min: 6 })
    .withMessage('password field must have at least 6 characters')
    .isString()
    .withMessage('password field must be a string'),

  check('role')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .not()
    .isEmpty()
    .withMessage('role field cannot be empty')
    .bail()
    .isString()
    .withMessage('role field must be a string'),

  check('wallet_hash')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .not()
    .isEmpty()
    .withMessage('wallet_hash field cannot be empty')
    .isLength({ min: 5 })
    .withMessage('wallet_hash field must have at least 3 letters')
    .isString()
    .withMessage('wallet_hash field must be a string'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateLogin = [
  check('email')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .isEmail()
    .withMessage('email field must be formatted as an email string')
    .bail(),

  check('password')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .not()
    .isEmpty()
    .withMessage('password field cannot be empty')
    .isLength({ min: 6 })
    .withMessage('password field must have at least 6 characters')
    .isString()
    .withMessage('password field must be a string'),

  check('wallet_hash')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .not()
    .isEmpty()
    .withMessage('wallet_hash field cannot be empty')
    .isLength({ min: 5 })
    .withMessage('wallet_hash field must have at least 3 letters')
    .isString()
    .withMessage('wallet_hash field must be a string'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateRegister,
  validateLogin,
};
