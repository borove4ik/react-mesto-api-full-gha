const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized');

const { JWT_SECRET, JWT_SECRET_DEVELOPMENT, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  let payload;
  try {
    const { cookies } = req;
    if ((cookies && cookies.jwt)) {
      const token = cookies.jwt;
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEVELOPMENT);
      req.user = payload;
      next();
    } else {
      next(new UnauthorizedError('Неверные авторизационные данные'));
    }
  } catch (error) {
    next(new UnauthorizedError('Неверные авторизационные данные19'));
  }
};
