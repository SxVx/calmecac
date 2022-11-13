const { User } = require('../../models');
const createError = require('http-errors');
const HTTP_CODE = require('../../utils/httpCode');
const { bcryptPassword, compareSync } = require('../../utils/third-parties/bcryptPassword');
const { s3upload, s3getUrl } = require('../../utils/third-parties/awsS3');
const { fullCurrentDate } = require('../../utils/date');
const sharp = require('sharp');
const { generateToken } = require('../../utils/third-parties/jwt');

class Auth {
  static register = async ({ body, files }, res, next) => {
    try {
      const password = body.password ? await bcryptPassword(body.password) : null;
      const filesStore = await this.#validateFile(files);

      const user = await User.create({
        username: body?.username,
        email: body?.email,
        password,
        role: body?.role,
        wallet_hash: body?.wallet_hash,
        image_url: filesStore['image']?.path,
      });

      const data = {
        username: user.username,
        email: user.email,
        role: user.role,
        wallet_hash: user.wallet_hash,
        image_url: await s3getUrl(user.image_url),
      };

      return res.status(HTTP_CODE.CREATED).json({ data });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  };

  static login = async ({ body: { email, password, wallet_hash } }, res, next) => {
    try {
      const user = wallet_hash
        ? await User.findOne({ where: { wallet_hash } })
        : await User.findOne({
            where: {
              email,
            },
          });

      if (!user) return next(createError.NotFound('User Not Found'));

      const checkPass = await compareSync(password, user.password);
      if (!checkPass) next(createError.Unauthorized('Invalid Access'));

      const token = await generateToken({ id: user.id });

      const data = {
        username: user.username,
        email: user.email,
        role: user.role,
        wallet_hash: user.wallet_hash,
        image_url: await s3getUrl(user.image_url),
        token,
      };

      return res.json({ data });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  };

  static logout = async (req, res, next) => {
    try {
      return res.status(200).json({ data: { message: 'logout' } });
    } catch (error) {
      next(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, error));
    }
  };

  static #validateFile = async (files) => {
    const filterFiles = !files ? [] : files.filter((file) => ['image'].includes(file.fieldname));
    let filesStore = { image: {} };

    await Promise.all(
      filterFiles.map(async (file) => {
        let extName = file.originalname.split('.').pop().toLocaleLowerCase();
        let storePath = `Hackathon/user/user-${fullCurrentDate()}.${extName}`;
        let buffer = await sharp(file.buffer).webp({ quality: 20 }).toBuffer();

        filesStore[file.fieldname].path = storePath;
        return s3upload(buffer, storePath);
      }),
    );
    return filesStore;
  };
}

module.exports = Auth;
