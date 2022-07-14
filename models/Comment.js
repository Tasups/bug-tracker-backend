const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: [true, "must provide a comment"],
    trim: true,
    minLength: [20, "comment cannot be less than 20 characters"],
    maxLength: [140, "comment cannot be more than 140 characters"],
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('Comment', commentSchema)