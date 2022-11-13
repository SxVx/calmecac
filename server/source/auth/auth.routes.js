const router = require('express').Router();
const AuthController = require('./auth.controller');
const { validateRegister, validateLogin } = require('./auth.validator');
const { expireToken } = require('../../utils/third-parties/jwt');
const multer = require('multer');
const multiPart = multer({
  limits: { fileSize: Infinity },
});

router.post('/register', multiPart.any(), validateRegister, AuthController.register);

router.post('/login', validateLogin, AuthController.login);

router.post('/logout', expireToken, AuthController.logout);

module.exports = router;
