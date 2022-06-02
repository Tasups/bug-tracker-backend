const mongoose = require('mongoose')

const IssueSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: [true, 'must provide project title'],
    trim: true,
    maxLength: [30, 'project name cannot be more than 30 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  description: {
    type: String,
    required: [true, 'must provide a succinct description of the project'],
    trim: true,
    maxLength: [120, 'project description cannot be more than 120 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  issueTitle: {
    type: String,
    required: [true, 'must provide issue title'],
    trim: true,
    maxLength: [30, 'project name cannot be more than 30 characters']
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
  developer: {
    type: String,
    enum: {
      values: ['Jason W.', 'Ada L.', 'Alan T.'],
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
    trim: true
  }
})

module.exports = mongoose.model('Issue', IssueSchema)