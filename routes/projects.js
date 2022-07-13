const express = require('express')
const router = express.Router()

const {
  getAllProjects,
  createProject,
  getProject,
  deleteProject
} = require('../controllers/projects')

router.route("/dashboard").get(getAllProjects).post(createProject);
router.route('/dashboard/:id').get(getProject)

module.exports = router

