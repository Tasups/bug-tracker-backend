const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    maxLength: [20, 'name cannot be more than 20 characters']
  }, 
  email: {
    type: String,
    required: [true, 'must provide an email'],
    minLength: [6, 'email must be at least 6 characters'],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'password must be at least 8 characters']
  },
  tickets: [
    { 
      type: mongoose.Types.ObjectId, 
      required: true, 
      ref: 'Ticket' 
    }
  ], 
  projects: [
    { 
      type: mongoose.Types.ObjectId, 
      required: true, 
      ref: 'Project'
    }
  ],
  tickets: [
    {
      type: mongoose.Types.ObjectId, required: true, ref: 'Ticket'
    }
  ]
})

module.exports = mongoose.model('User', userSchema)
