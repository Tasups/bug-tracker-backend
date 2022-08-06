const express = require('express')
const router = express.Router

const {
  getCommentsByTicketId,
  createComment,
  getCommentById,
  // DELETE MAY BECOME AN ARCHIVE FUCNTION INSTEAD
  deleteComment,
  getCommentsByTicketId,
} = require('../controllers/comments')

// THIS ID MAY NOT BE THE CORRECT ONE, IT MAY BE JUST id
router.route('projectboard/:pid/:tid').get(getCommentsByTicketId).post(createComment)
router.route('projectboard/:pid/:tid/:cid').get(getCommentById).delete(deleteComment)

module.exports = router