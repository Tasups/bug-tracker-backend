const mongoose = require('mongoose')

const ProjectSchema = new mongoose.Schema({
  projectTitle: {
    type: String,
    required: [true, 'must provide project title'],
    trim: true,
    maxLength: [30, 'project name cannot be more than 30 characters']
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
  contributors: {
    type: mongoose.Types.ObjectId, required: true, ref: 'User'
  },
  tickets: {
    type: mongoose.Types.ObjectId, required: true, ref: 'Ticket'
  }
})

module.exports = mongoose.model('Project', ProjectSchema)