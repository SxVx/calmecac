const { User } = require('../../models');

class Auth {
  static login = async (req, res, next) => {
    return { message: 'ToDo: Login' };
  };
}

module.exports = Auth;
