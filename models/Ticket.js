const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "must provide issue title"],
    trim: true,
    maxLength: [30, "issue title cannot be more than 30 characters"],
  },
  description: {
    type: String,
    required: [true, "must provide description"],
    trim: true,
    minLength: [16, "description cannot be less than 16 characters"],
    maxLength: [50, "description cannot be more than 50 characters"],
  },
  priority: {
    type: String,
    enum: {
      values: ["low", "normal", "important", "critical"],
      message: `{VALUE} is not supported`,
    },
  },
  author: {
    type: String,
    required: true,
    trim: true,
    maxLength: [16, "author cannot be more than 16 characters"],
  },
  status: {
    type: String,
    enum: {
      values: ["open", "closed"],
      message: `{VALUE} is not supported`,
    },
  },
  type: {
    type: String,
    enum: {
      values: ["feature", "bug"],
      message: `{VALUE} is not supported`,
    },
  },
  eta: {
    type: String,
    enum: {
      values: ["one day", "one week", "one month", "one quarter"],
      message: `{VALUE} is not supported`,
    },
  },
  // consider putting this one in to make the eta have a starting date that can be referenced
  // createdAt: {
  //   type: Date,
  //   default: Date.now()
  // },
  creator: [
    {
      type: mongoose.Types.ObjectId,
      //required: true, Change back when users are implemented
      ref: "Project",
    },
  ],
});

module.exports = mongoose.model('Ticket', ticketSchema)