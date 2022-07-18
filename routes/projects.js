const express = require('express')
const router = express.Router()

const {
  getAllProjects,
  createProject,
  getProjectById,
} = require('../controllers/projects')

router.route("/dashboard").get(getAllProjects).post(createProject);
router.route('/projectboard/:id').get(getProjectById)

module.exports = router

