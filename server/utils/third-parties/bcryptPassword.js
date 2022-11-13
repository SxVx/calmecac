const bcrypt = require('bcryptjs');
const saltRounds = 10;
const createError = require('http-errors');
const HTTP_CODE = require('../../utils/httpCode');

module.exports = {
  bcryptPassword: async (password) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(createError(HTTP_CODE.INTERNAL_SERVER_ERROR, err));
        resolve(hash);
      });
    });
  },
  compareSync: bcrypt.compareSync,
  hash: bcrypt.hash,
};
