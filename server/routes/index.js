const express = require('express');
const router = express.Router();
const HttpCode = require('../utils/httpCode');

router.get('/', (req, res, next) => {
  //return next(createError(404, 'Group not found'))
  res.status(HttpCode.OK).json({ message: 'Welcome to api - calmécac' });
});

module.exports = router;
