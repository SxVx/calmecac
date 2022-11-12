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

/**
 * ToDO:
 * Remove test code and implement correct login
 */
const { User } = require('../../models');
const { generateToken, verifyToken } = require('../../utils/third-parties/jwt');

// ToDo: Test code
router.post('/x1', async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: 3 } });
    const token = await generateToken({ id: user.id });
    res.json({ token });
  } catch (error) {
    next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
  }
});
// ToDo: Test code
router.post('/x2', verifyToken, async (req, res, next) => {
  try {
    res.json({ message: 'ITS WORK', dataUser: req.USER_LOGGED });
  } catch (error) {
    next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = router;
