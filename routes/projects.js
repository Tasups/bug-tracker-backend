const express = require('express')
const router = express.Router()

const {
  getAllProjects,
  createProject,
  getProject,
} = require('../controllers/projects')

// base url http://localhost:5000 ? 

router.route("/dashboard").get(getAllProjects).post(createProject);
router.route('/dashboard/:id').get(getProject)

module.exports = router