const express = require('express')
const router = express.Router()

const {
  getAllIssues,
  createIssue,
  getIssue,
  deleteIssue,
  updateIssue
} = require('../controllers/issues')

router.route('/').get(getAllIssues).post(createIssue)
router.route('/:id').get(getIssue).delete(deleteIssue).patch(updateIssue)

module.exports = router