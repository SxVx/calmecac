/**
 * Enlaces de referencia
 * https://github.com/validatorjs/validator.js
 * https://express-validator.github.io/docs/
 * https://express-validator.github.io/docs/custom-error-messages.html
 */
const { check } = require('express-validator');
const { validateResult } = require('../../utils/validate_helper');
const { Category } = require('../../models');

const validateCreate = [
  check('name')
    .exists('name')
    .withMessage('name field is required')
    .bail()
    .not()
    .isEmpty()
    .withMessage('name field cannot be empty')
    .isLength({ min: 3 })
    .bail()
    .withMessage('name field must have at least 3 letters')
    .isString()
    .withMessage('name field must be a string'),

  check('description')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .not()
    .isEmpty()
    .withMessage('description field cannot be empty')
    .isLength({ min: 10 })
    .bail()
    .withMessage('description field must have at least 3 letters')
    .isString()
    .withMessage('description field must be a string'),

  check('categories_ids')
    .exists()
    .withMessage('categories_ids field is required')
    .bail()
    .not()
    .isEmpty()
    .withMessage('categories_ids field can not be empty')
    .bail()
    .custom((val) => {
      if (val instanceof Array || typeof val == 'string') return true;
      else throw new Error('categories_ids must be type array or string');
    })
    .bail()
    .custom((value) => {
      let listValue = [];
      if (typeof value == 'string')
        listValue = value
          .slice(1)
          .slice(0, value.length - 2)
          .split(',');
      else listValue = value;
      listValue.map((element) => {
        if (isNaN(element) || parseInt(element) <= 0)
          throw new Error('data from categories_ids must be integers, greater than 0');
      });
      return true;
    })
    .bail()
    .custom(async (value) => {
      let listValue = [];
      if (value instanceof Array) listValue = value;
      else
        listValue = value
          .slice(1)
          .slice(0, value.length - 2)
          .split(',');
      await Promise.all(
        listValue.map(async (element) => {
          const result = await Category.findByPk(element);
          if (!result) throw new Error(`Category id ${element} is not valid`);
          return Promise.resolve(true);
        }),
      );
      return true;
    })
    .bail()
    .customSanitizer((value) => {
      let listValue = [];
      if (value instanceof Array) listValue = value;
      else
        listValue = value
          .slice(1)
          .slice(0, value.length - 2)
          .split(',');
      return listValue;
    }),

  check('image').default(null).optional({ nullable: true, checkFalsy: true }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateUpdate = [
  check('id')
    .exists()
    .withMessage('id field is required')
    .isNumeric()
    .withMessage('id field must be a integer')
    .custom((value) => {
      if (value < 1) {
        throw new Error('id field must have correct value');
      }
      return true;
    }),

  check('name')
    .exists('name')
    .withMessage('name field is required')
    .bail()
    .not()
    .isEmpty()
    .withMessage('name field cannot be empty')
    .isLength({ min: 3 })
    .bail()
    .withMessage('name field must have at least 3 letters')
    .isString()
    .withMessage('name field must be a string'),

  check('description')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .not()
    .isEmpty()
    .withMessage('description field cannot be empty')
    .isLength({ min: 10 })
    .bail()
    .withMessage('description field must have at least 3 letters')
    .isString()
    .withMessage('description field must be a string'),

  check('categories_ids')
    .default(null)
    .optional({ nullable: true })
    .customSanitizer((val) => {
      if (val == 'null') return null;
      return val;
    })
    .not()
    .isEmpty()
    .withMessage('categories_ids field can not be empty')
    .bail()
    .custom((val) => {
      if (val instanceof Array || typeof val == 'string') return true;
      else throw new Error('categories_ids must be type array or string');
    })
    .bail()
    .custom((value) => {
      let listValue = [];
      if (typeof value == 'string')
        listValue = value
          .slice(1)
          .slice(0, value.length - 2)
          .split(',');
      else listValue = value;
      listValue.map((element) => {
        if (isNaN(element) || parseInt(element) <= 0)
          throw new Error('data from categories_ids must be integers, greater than 0');
      });
      return true;
    })
    .bail()
    .custom(async (value) => {
      let listValue = [];
      if (value instanceof Array) listValue = value;
      else
        listValue = value
          .slice(1)
          .slice(0, value.length - 2)
          .split(',');
      await Promise.all(
        listValue.map(async (element) => {
          const result = await Category.findByPk(element);
          if (!result) throw new Error(`Category id ${element} is not valid`);
          return Promise.resolve(true);
        }),
      );
      return true;
    })
    .bail()
    .customSanitizer((value) => {
      let listValue = [];
      if (value instanceof Array) listValue = value;
      else
        listValue = value
          .slice(1)
          .slice(0, value.length - 2)
          .split(',');
      return listValue;
    }),

  check('image').default(null).optional({ nullable: true, checkFalsy: true }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = {
  validateCreate,
  validateUpdate,
};
