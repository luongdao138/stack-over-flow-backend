const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment').schema;

const questionModel = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 15,
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minLength: 30,
  },
  tags: [{ type: String, required: true, trim: true }],
  comments: [commentSchema],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  upvotedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downVotedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  views: { type: Number, default: 0 },
  hotAlgo: { type: Number, default: Date.now },
  acceptedAnswer: { type: Schema.Types.ObjectId, ref: 'Answer' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Question = model('Question', questionModel);
module.exports = Question;
