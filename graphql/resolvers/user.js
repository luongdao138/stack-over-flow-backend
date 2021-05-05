const User = require('../../models/User');
const { registerValidator, loginValidator } = require('../../utils/validators');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const Question = require('../../models/Question');
const Answer = require('../../models/Answer');

module.exports = {
  Query: {
    getUser: async (_, { username }) => {
      if (username.trim() === '')
        throw new UserInputError('Username must be provided!');

      // find the user
      const user = await User.findOne({ username });
      if (!user)
        throw new UserInputError(`Username ${username} does not exist!`);

      // find the rencent questions and recent answers
      const recentQuestions = await Question.find(
        { author: user._id },
        'id title points createdAt'
      )
        .sort({ createdAt: -1 })
        .limit(5);
      const recentAnswers = await Question.find(
        { answers: { $elemMatch: { author: user._id } } },
        'id title points createdAt'
      )
        .sort({ createdAt: -1 })
        .limit(5);

      return {
        id: user._id,
        role: user.role,
        username: user.username,
        answers: user.answers,
        questions: user.questions,
        createdAt: user.createdAt,
        recentAnswers,
        recentQuestions,
      };
    },
  },
  Mutation: {
    register: async (_, { username, password }) => {
      // check if the register input is valid
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
    login: async (_, { username, password }) => {
      // check if the login input is valid
      const { errors, isValid } = loginValidator(username, password);
      if (!isValid) throw new UserInputError('User input error', { errors });

      // check if the username exists or not
      const existingUser = await User.findOne({ username });
      if (!existingUser)
        throw new UserInputError(`Username ${username} does not exists!`);

      // check the password
      const isPwValid = await bcrypt.compare(password, existingUser.password);
      if (!isPwValid) throw new UserInputError('Password is not correct!');

      // generate access token
      const token = jwt.sign(
        { id: existingUser._id },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: '1h',
        }
      );

      return {
        username,
        id: existingUser._id,
        token,
        role: existingUser.role,
      };
    },
  },
};
