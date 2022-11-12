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

// ----------------------------------------------------------------
// ToDo: Test Upload Files
const multer = require('multer');
const multiPart = multer({
  limits: { fileSize: Infinity },
});

const { s3upload } = require('../../utils/third-parties/awsS3');
const { fullCurrentDate } = require('../../utils/date');
const sharp = require('sharp');

router.post('/upload', multiPart.any(), async (req, res, next) => {
  try {
    const files = req.files;

    const filterFiles = !files
      ? []
      : files.filter((file) => ['test_files'].includes(file.fieldname));
    let pathFiles = [];

    await Promise.all(
      filterFiles.map(async (file) => {
        let extName = file.originalname.split('.').pop().toLocaleLowerCase();
        let storePath = `Hackathon/test/test-${fullCurrentDate()}.${extName}`;
        // ToDo: Validate only images
        let buffer = await sharp(file.buffer).webp({ quality: 20 }).toBuffer();
        pathFiles.push(storePath);
        return s3upload(buffer, storePath);
      }),
    );

    res.status(200).json({ pathFiles });
  } catch (error) {
    next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = router;
