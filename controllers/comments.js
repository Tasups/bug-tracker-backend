const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const Comment = require("../models/Project");
const Ticket = require('../models/Ticket');
// If I consider using the User to stash a key:value pair of comments
// const User = require('../models/User');
const mongoose = require("mongoose");

// get all comments
const getAllComments = asyncWrapper(async (req, res) => {
  const projectId = req.params.id; 
  const comments = await Ticket.findById(projectId).populate("comments");
  res.status(200).json({ comments });
});

// create a Comment
const createComment = asyncWrapper(async (req, res, next) => {
  const { comment, author, createdAt } =
    req.body;
  const createdComment = new Comment({
    comment, author, createdAt
  })
  // the next line is if I want to put in a comments key and an array in the User model
  // I'm really not sure if that's what I want to do.
  /*
  const user = await User.findById(author)
  if (!user) {
    return next(createCustomError(`No user with id: ${author}`))
  }
  */
  try {
    const sess = await mongoose.startSession()
    sess.startTransaction()
    await createdComment.save({ session: sess })
    // the next line is if I choose to create a User model with a comment key and array value pair
    //user.comments.push(createdComment)
    //await user.save({ session: sess })

    await sess.commitTransaction()
  } catch (err) {
    console.log(err)
    return next(createCustomError(`Creating comment failed. Please try again.`, 500))
  }
  res.status(201).json({ comment: createdComment });
});

const getComment = asyncWrapper(async (req, res, next) => {
  const { id: commentID } = req.params;
  const comment = await Comment.findOne({ _id: commentID });
  if (!comment) {
    return next(createCustomError(`No comment with id: ${commentID}`, 404));
  }
  res.status(200).json({ comment });
});

const deleteComment = asyncWrapper(async (req, res, next) => {
  const { id: commentID } = req.params;
  const comment = await Comment.findOneAndDelete({ _id: commentID });
  if (!comment) {
    return next(createCustomError(`No comment with id: ${commentID}`, 404));
  }
  res.status(200).json({ comment });
});
 /* IF I CONSIDER UPDATING COMMENTS
const updateComment = asyncWrapper(async (req, res, next) => {
  const { id: commentID } = req.params;
  const comment = await Comment.findOneAndUpdate({ _id: commentID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!comment) {
    return next(createCustomError(`No comment with id: ${commentID}`, 404));
  }
  res.status(200).json({ comment });
});
*/

module.exports = {
  getAllComments,
  createComment,
  getComment,
  deleteComment,
};
