const router = require('express').Router();
const CourseController = require('./course.controller');
const { verifyToken } = require('../../utils/third-parties/jwt');
const { validateCreate, validateUpdate } = require('./course.vailidator');

const multer = require('multer');
const multiPart = multer({
  limits: { fileSize: Infinity },
});

router.get('/list', verifyToken, CourseController.list);
router.post('/create', verifyToken, multiPart.any(), validateCreate, CourseController.create);
router.put('/update/:id', verifyToken, validateUpdate, CourseController.update);
module.exports = router;
