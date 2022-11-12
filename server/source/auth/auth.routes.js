const router = require('express').Router();
const AuthController = require('./auth.controller');
const createError = require('http-errors');
const HTTP_CODE = require('../../utils/httpCode');

router.post('/login', async (req, res, next) => {
  try {
    const data = await AuthController.login(req, res, next);
    res.status(HTTP_CODE.OK).json(data);
  } catch (error) {
    next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
  }
});

const { User } = require('../../models');
const { generateToken, verifyToken } = require('../../utils/third-parties/jwt');

router.post('/x1', async (req, res, next) => {
  try {
    const user = await User.findOne();
    const token = await generateToken({ id: user.id });
    res.json({ token });
  } catch (error) {
    next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
  }
});

router.post('/x2', verifyToken, async (req, res, next) => {
  try {
    res.json({ message: 'ITS WORK' });
  } catch (error) {
    next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = router;
