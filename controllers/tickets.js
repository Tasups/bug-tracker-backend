const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const mongoose = require('mongoose')
const Ticket = require('../models/Ticket')
const Project = require('../models/Project')
const User = require('../models/User')

const getTicketsByProjectId = asyncWrapper(async (req, res) => {
  // THIS ID MAY BE INCORRECT
  const projectId = req.params.id 
  const tickets = await Project.findById(projectId).populate('tickets')
  res.status(200).json({ tickets })
})

const createTicket = asyncWrapper(async (req, res) => {
  const ticket = await Ticket.create(req.body);
  res.json({ ticket: ticket.toObject({ getters: true }) });
});

// const createTicket = asyncWrapper(async (req, res, next) => {
//   const {
//     title,
//     description,
//     priority,
//     author,
//     status,
//     type,
//     eta,
//     creator,
//   } = req.body;
//   const createdTicket = new Ticket({
//     title,
//     description,
//     priority,
//     author,
//     status,
//     type,
//     eta,
//     creator,
//   });
//   const user = await User.findById(creator)
//   if(!user) {
//     return next(createCustomError(`No user with id: ${creator}`, 404))
//   }
//   try {
//     const sess = await mongoose.startSession()
//     sess.startTransaction()
//     await createdTicket.save({ session: sess })
//     user.tickets.push(createdTicket)
//     await user.save({ session: sess })
//     await sess.commitTransaction()
//   } catch (err) {
//     console.log(err)
//     return next(createCustomError(`Creating ticket failed. Please try again.`, 500))
//   }
//   res.json({ ticket: createdTicket.toObject({ getters: true }) });
//   //res.status(201).json({ ticket: createdTicket })
// })

const getTicketById = asyncWrapper(async (req, res, next) => {
  const { id: ticketID} = req.params
  const ticket = await Project.findOne({ _id: ticketID });
  if (!ticket) {
    return next(createCustomError(`No ticket with id: ${ticketID}`, 404));
  }
  res.status(200).json({ ticket });
})

const deleteTicket = asyncWrapper(async (req, res, next) => {
  const { id: ticketID } = req.params
  const ticket = await Project.findOneAndDelete({ _id: ticketID });
  if (!ticket) {
    return next(createCustomError(`No ticket with id: ${ticketID}`, 404));
  }  
  res.status(200).json({ ticket });
})
/* THIS IS IF I WANT TO UPDATE A TICKET
const updateProject = asyncWrapper(async (req, res, next) => {
  const { id: projectID } = req.params
  const project = await Project.findOneAndUpdate({ _id: projectID }, req.body, {
    new: true,
    runValidators: true
  })
  if (!project) {
    return next(createCustomError(`No project with id: ${projectID}`, 404))
  }
  res.status(200).json({ project })
})
*/

module.exports = {
  getTicketsByProjectId,
  createTicket,
  getTicketById,
  deleteTicket,
}