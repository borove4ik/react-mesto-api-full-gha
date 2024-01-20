const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET, JWT_SECRET_DEVELOPMENT } = process.env;

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEVELOPMENT, { expiresIn: '7d' });

module.exports = generateToken;
