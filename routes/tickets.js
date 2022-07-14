const express = require('express')
const router = express.Router()

const {
  getTicketsByProjectId,
  createTicket,
  getTicketById,
  // DELETE MAY BECOME AN ARCHIVE FUCNTION INSTEAD
  deleteTicket
} = require('../controllers/tickets')

// THIS ID MAY NOT BE THE CORRECT ONE, IT MAY BE JUST id
router.route("/projectboard/:pid").get(getTicketsByProjectId).post(createTicket)
router.route('/projectboard/:pid/:tid').get(getTicketById).delete(deleteTicket)

module.exports = router