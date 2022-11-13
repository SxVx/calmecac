const router = require('express').Router();
const CategoryController = require('./category.controller');
const { verifyToken } = require('../../utils/third-parties/jwt');
const { validateCreatePreferences, validateUpdatePreferences } = require('./category.validator');

router.get('/list', verifyToken, CategoryController.list);

router.post(
  '/create-preferences',
  verifyToken,
  validateCreatePreferences,
  CategoryController.createPreferences,
);

router.post(
  '/create-preferences',
  verifyToken,
  validateCreatePreferences,
  CategoryController.createPreferences,
);

router.put(
  '/update-preferences',
  verifyToken,
  validateUpdatePreferences,
  CategoryController.updatePreferences,
);

router.get('/user-preferences', verifyToken, CategoryController.userPreferences);

module.exports = router;
