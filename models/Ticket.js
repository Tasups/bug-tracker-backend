const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
  ticketTitle: {
    type: String,
    required: [true, 'must provide issue title'],
    trim: true,
    maxLength: [30, 'issue title cannot be more than 30 characters']
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'normal', 'important', 'critical'],
      message: `{VALUE} is not supported`
    }
  },
  issuer: {
    type: String,
    enum: {
      values: ['Admin', 'Lead', 'QA'],
      message: `{VALUE} is not supported`
    }
  },
  contributor: {
    type: String,
    enum: {
      values: ['Jason Whisnant', 'Ada Lovelace', 'Alan Turing'],
      message: `{VALUE} is not supported`
    }
  },
  status: {
    type: String,
    enum: {
      values: ['open', 'closed'],
      message: `{VALUE} is not supported`
    }
  },
  type: {
    type: String,
    enum: {
      values: ['feature', 'bug'],
      message: `{VALUE} is not supported`
    }
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  creator: {
    type: mongoose.Types.ObjectId, required: true, ref: 'Project'
  }
})

module.exports = mongoose.model('Ticket', ticketSchema)