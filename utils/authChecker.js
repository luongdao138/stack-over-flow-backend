const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const User = require('../models/User');

const authChecker = async ({ req }) => {
  const authorization = req.header('Authorization');
  if (!authorization) throw new AuthenticationError('Token must be provided!');
  if (!authorization.startsWith('Bearer '))
    throw new AuthenticationError(
      'Authentication token must be "Bearer [token]"!'
    );

  const token = authorization.replace('Bearer ', '');
  try {
    const { id } = await jwt.verify(token, process.env.ACCESS_TOKEN);
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new AuthenticationError('Invalid/Expired token!');
  }
};

module.exports = authChecker;
