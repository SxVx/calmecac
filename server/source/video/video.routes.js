const router = require('express').Router();

const VideoController = require('./video.controller');
const { verifyToken } = require('../../utils/third-parties/jwt');
// const { validateCreate, validateUpdate } = require('./video.validator');

const multer = require('multer');
const multiPart = multer({
  limits: { fileSize: Infinity },
});

router.get('/list', verifyToken, VideoController.list);
router.post('/create', verifyToken, multiPart.any(), VideoController.create);
router.put('/update/:id', verifyToken, VideoController.update);
// router.post('/create', verifyToken, multiPart.any(), validateCreate, CourseController.create);
// router.put('/update/:id', verifyToken, validateUpdate, CourseController.update);

module.exports = router;
