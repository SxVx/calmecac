const router = require('express').Router();
const { User } = require('../../models');
const createError = require('http-errors');
const HTTP_CODE = require('../../utils/httpCode');

router.get('/list', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(HTTP_CODE.OK).json({ data: users });
  } catch (error) {
    next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = router;
