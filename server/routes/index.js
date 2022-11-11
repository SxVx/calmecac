const express = require('express');
const router = express.Router();
const HttpCode = require('../utils/httpCode');
const user = require('../source/user/user.routes');

router.get('/', (req, res) => {
  res.status(HttpCode.OK).json({ message: 'Welcome to api - calmécac' });
});

router.use('/user', user);

module.exports = router;
