/**
 * Enlaces de referencia
 * https://github.com/validatorjs/validator.js
 * https://express-validator.github.io/docs/
 * https://express-validator.github.io/docs/custom-error-messages.html
 */
const { check, body } = require('express-validator');
const { validateResult } = require('../../utils/validate_helper');
const { User, Category } = require('../../models');

const correctValueID = (value) => {
  if (value < 1) throw new Error('type field must have correct value, bigger than 0');
  return true;
};

const validateCreatePreferences = [
  check('preferences')
    .exists()
    .withMessage('preferences field is required')
    .bail()
    .isArray()
    .withMessage('preferences field must be a Array')
    .bail()
    .not()
    .isEmpty()
    .withMessage('preferences field cannot be empty')
    .bail(),

  body('preferences.*.category_id')
    .exists()
    .withMessage('category_id field is required')
    .bail()
    .isNumeric()
    .withMessage('category_id field must be a integer')
    .bail()
    .custom(correctValueID)
    .custom(async (value) => {
      const result = await Category.findByPk(value);
      if (!result) throw new Error(`Category id ${value} is not valid`);
      return true;
    }),
  body('preferences.*.user_id')
    .exists()
    .withMessage('user_id field is required')
    .bail()
    .isNumeric()
    .withMessage('user_id field must be a integer')
    .bail()
    .custom(correctValueID)
    .custom(async (value) => {
      const result = await User.findByPk(value);
      if (!result) throw new Error(`User id ${value} is not valid`);
      return true;
    }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateCreatePreferences,
  validateUpdatePreferences: validateCreatePreferences,
};
