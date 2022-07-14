const express = require('express')
const router = express.Router()

const {
  getTicketsByProjectId,
  createTicket,
  getTicket,
  deleteTicket
} = require('../controllers/tickets')

router.route("/projectboard").get(getTicketsByProjectId).get(getTicket).post(createTicket).delete(deleteTicket)

module.exports = router