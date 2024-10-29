import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Comment from "../models/commentmodel";
import { Question } from "../models/questionmodel";
import User from "../models/usermodel";

// create a new comment
const createComment = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userid, username, userphoto, answer, questionId } = req.body;

  try {
    const questionToComment = await Question.findById(questionId);
    if (!questionToComment) {
      return res.status(404).json({ error: "Question not found!" });
    }

    const userToAddCommentid = await User.findById(userid);
    if (!userToAddCommentid) {
      return res.status(404).json({ error: "User not found!" });
    }

    const newComment = new Comment({
      userid,
      username,
      userphoto,
      answer,
      questionId,
    });

    await newComment.save();

    const commentIdString = String(newComment._id);

    questionToComment.comments.push(commentIdString);
    userToAddCommentid.comments.push(commentIdString);

    await questionToComment.save();
    await userToAddCommentid.save();

    return res.status(201).json({ message: newComment });
  } catch (error) {
    return res.status(500).json({ error: "Error creating comment!" });
  }
};

// get all comments
const getAllComments = async (req: Request, res: Response) => {
  const { questionId } = req.params;

  if (!questionId) {
    return res.status(400).json({ error: "questionId is required" });
  }

  try {
    const comments = await Comment.find({ questionId }).sort({ createdAt: -1 });
    return res.status(200).json({
      message: comments,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch the comments!" });
  }
};
export { createComment, getAllComments };
