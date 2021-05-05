const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment').schema;

const answerSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minLength: 20,
  },
  comments: [commentSchema],
  points: [{ type: Number, default: 0 }],
  upvotedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  updatedAt: { type: Date, default: Date.now },
});

const Answer = model('Answer', answerSchema);
module.exports = Answer;
