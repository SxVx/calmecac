const router = require('express').Router();
const { User } = require('../../models');
const createError = require('http-errors');
const HTTP_CODE = require('../../utils/httpCode');
const { s3getUrl } = require('../../utils/third-parties/awsS3');

router.get('/list', async (req, res, next) => {
  try {
    const users = await User.findAll();

    const result = await Promise.all(users.map(async item =>{
      const image_url = await s3getUrl(item.image_url)
      return {
        id: item.id,
        username: item.username,
        email: item.email,
        role: item.role,
        image_url,
      }
    }))

    res.status(HTTP_CODE.OK).json({ data: result });
  } catch (error) {
    next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
  }
});

module.exports = router;
