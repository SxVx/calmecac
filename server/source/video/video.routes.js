const router = require('express').Router();

const VideoController = require('./video.controller');
const { verifyToken } = require('../../utils/third-parties/jwt');

const multer = require('multer');
const multiPart = multer({
  limits: { fileSize: Infinity },
});

router.get('/:course_id/video/list', verifyToken, VideoController.list);
router.post('/:course_id/video/create', verifyToken, multiPart.any(), VideoController.create);

module.exports = router;
