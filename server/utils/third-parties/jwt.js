const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const SECRET_KEY = process.env.ACCESS_TOKEN_SECRET;

module.exports = {
  /**
   * FUNCTION: returns the Bearer JWT access token, payload to generate token
   * @param object payload
   * @returns Promise String
   */
  generateToken: async (payload) => {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: 30 * 60 });
  },

  /**
   * MIDDLEWARE; Verifies token authenticity and gives access to the resource
   * @params Router req, res, next
   */
  verifyToken: async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return next(createError.Unauthorized('Access token is required'));

    const token = bearerHeader.split(' ')[1];
    const dataUser = jwt.verify(token, SECRET_KEY, (error, authData) => {
      if (error) return next(createError.Unauthorized('UNAUTHORIZED TOKEN'));
      return authData;
    });

    req.token = token;
    req.USER_LOGGED = dataUser;
    next();
  },

  /**
   * MIDDLEWARE: Token expires by forcing timeout
   * @param Router req, res, next
   */
  expireToken: async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return next(createError.Unauthorized('Access token is required'));

    jwt.sign(bearerHeader, '', { expiresIn: 1 }, (logout, err) => {
      if (err) next(createError.Unauthorized('' + err));
      return logout;
    });
    next();
  },
};
