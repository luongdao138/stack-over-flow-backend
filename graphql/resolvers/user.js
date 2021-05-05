const User = require('../../models/User');
const { registerValidator } = require('../../utils/validators');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

module.exports = {
  Mutation: {
    register: async (_, { username, password }) => {
      // check if the register input is validate
      const { errors, isValid } = registerValidator(username, password);
      if (!isValid)
        throw new UserInputError('User input error', {
          errors,
        });

      // check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser)
        throw new UserInputError(`Username ${username} already exists!`);

      // hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPw = await bcrypt.hash(password, salt);

      // save the user to the database
      const user = new User({
        username,
        password: hashPw,
      });
      const savedUser = await user.save();

      // generate the token
      const token = jwt.sign({ id: savedUser._id }, process.env.ACCESS_TOKEN, {
        expiresIn: '1h',
      });

      return {
        username,
        id: savedUser._id,
        token,
        role: savedUser.role,
      };
    },
  },
};
