const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const Project = require('../models/Issue')

const getAllProjects = asyncWrapper(async (req, res) => {
  const projects = await Project.find({})
  res.status(200).json({ projects })
})

const createProject = asyncWrapper(async (req, res) => {
  const project = await Project.create(req.body)
  res.status(201).json({ project })
})

const getIssue = asyncWrapper(async (req, res, next) => {
  const { id: projectID} = req.params
  const project = await Project.findOne({ _id: projectID })
  if (!project) {
    return next(createCustomError(`No issue with id: ${projectID}`, 404))
  }
  res.status(200).json({ project })
})

const deleteProject = asyncWrapper(async (req, res, next) => {
  const { id: projectID } = req.params
  const project = await Project.findOneAndDelete({ _id: projectID })
  if (!project) {
    return next(createCustomError(`No issue with id: ${projectID}`, 404))
  }  
  res.status(200).json({ project })
})

const updateProject = asyncWrapper(async (req, res, next) => {
  const { id: projectID } = req.params
  const project = await Project.findOneAndUpdate({ _id: projectID }, req.body, {
    new: true,
    runValidators: true
  })
  if (!project) {
    return next(createCustomError(`No issue with id: ${projectID}`, 404))
  }
  res.status(200).json({ project })
})

module.exports = {
  getAllProjects,
  createProject,
  getIssue,
  deleteProject,
  updateProject
}