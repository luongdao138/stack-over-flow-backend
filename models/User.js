const { Schema, model } = require('mongoose');

const userModel = new Schema({
  username: {
    type: String,
    minLength: 3,
    maxLength: 30,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    default: 'user',
  },
  questions: [
    {
      quesId: {
        type: Schema.Types.ObjectId,
        ref: 'Question',
      },
      rep: {
        type: Number,
        default: 0,
      },
    },
  ],
  answers: [
    {
      ansId: {
        type: Schema.Types.ObjectId,
        ref: 'Answer',
      },
      rep: {
        type: Number,
        default: 0,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model('User', userModel);
module.exports = User;
