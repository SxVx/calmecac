const express = require('express');
const router = express.Router();
const createError = require('http-errors');

const user = require('../../source/user/user.routes');
const auth = require('../../source/auth/auth.routes');
const category = require('../../source/category/category.routes');
const course = require('../../source/course/course.routes');

router.use('/user', user);
router.use('/auth', auth);
router.use('/category', category);
router.use('/course', course);

router.use(async (req, _res, next) => {
  next(createError.NotFound(`Route not Found : "${req.url}" try specifying version`));
});

module.exports = router;
