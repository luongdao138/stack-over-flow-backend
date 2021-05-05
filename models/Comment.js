const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Comment = model('Comment', commentSchema);
module.exports = Comment;
