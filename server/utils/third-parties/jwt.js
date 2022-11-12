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
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  },

  /**
   * MIDDLEWARE; Verifies token authenticity and gives access to the resource
   * @params Router req, req, next
   */
  verifyToken: async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) return next(createError.Unauthorized('Access token is required'));

    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (error, authData) => {
      if (error) return next(createError.Unauthorized('UNAUTHORIZED TOKEN'));
      return authData;
    });

    req.token = token;
    next();
  },
};
