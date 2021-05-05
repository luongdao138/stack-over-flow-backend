const Question = require('../../models/Question');
const authChecker = require('../../utils/authChecker');
const { questionValidator } = require('../../utils/validators');
const { UserInputError } = require('apollo-server');

module.exports = {
  Mutation: {
    postQuestion: async (_, { title, body, tags }, context) => {
      const user = await authChecker(context);
      const { errors, isValid } = questionValidator(title, body, tags);
      if (!isValid)
        throw new UserInputError('Bad input', {
          errors,
        });

      try {
        const newQuestion = new Question({
          title,
          body,
          tags,
          author: user._id,
        });
        const savedQues = await newQuestion.save();
        const populateQues = await savedQues
          .populate('author', 'username')
          .execPopulate();

        user.questions.push({ quesId: savedQues._id });
        await user.save();

        return populateQues;
      } catch (error) {
        throw new UserInputError('User input error', {
          errors: error,
        });
      }
    },
    deleteQuestion: async (_, { quesId }, context) => {
      const user = await authChecker(context);
      const question = await Question.findById(quesId);
      if (!question) throw new UserInputError('Question not found!');
      if (
        question.author.toString() !== user._id.toString() &&
        user.role !== 'admin'
      )
        throw new UserInputError('Action not allowed!');

      await Question.deleteOne({ _id: quesId });
      return quesId;
    },
  },
};
