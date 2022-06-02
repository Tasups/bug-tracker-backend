const asyncWrapper = require('../middleware/async')
const { createCustomError } = require('../errors/custom-error')
const Issue = require('../models/Issue')

const getAllIssues = asyncWrapper(async (req, res) => {
  const issues = await Issue.find({})
  res.status(200).json({ issues })
})

const createIssue = asyncWrapper(async (req, res) => {
  const issue = await Issue.create(req.body)
  res.status(201).json({ issue })
})

const getIssue = asyncWrapper(async (req, res) => {
  const { id: issueID} = req.params
  const issue = await Issue.findOne({ _id: issueID })
  if (!issue) {
    return next(createCustomError(`No issue with id: ${issueID}`, 404))
  }
  res.status(200).json({ issue })
})

const deleteIssue = asyncWrapper(async (req, res, next) => {
  const { id: issueID } = req.params
  const issue = await Issue.findOneAndDelete({ _id: issueID })
  if (!issue) {
    return next(createCustomError(`No issue with id: ${issueID}`, 404))
  }  
  res.status(200).json({ issue })
})

const updateIssue = asyncWrapper(async (req, res, next) => {
  const { id: issueID } = req.params
  const issue = await Issue.findOneAndUpdate({ _id: issueID }, req.body, {
    new: true,
    runValidators: true
  })
  if (!issue) {
    return next(createCustomError(`No issue with id: ${issueID}`, 404))
  }
  res.status(200).json({ issue })
})

module.exports = {
  getAllIssues,
  createIssue,
  getIssue,
  deleteIssue,
  updateIssue
}