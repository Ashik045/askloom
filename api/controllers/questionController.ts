import { Request, Response } from "express";
import { Question } from "../models/questionmodel";
import User from "../models/usermodel";

// create a new question
const createQuestion = async (req: Request, res: Response) => {
  try {
    const newQuestion = await new Question({
      ...req.body,
      reacts: [],
      comments: [],
    });

    newQuestion.save();

    res.status(200).json({
      message: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error creating question!",
    });
  }
};

// get a new question
const getQuestionById = async (req: Request, res: Response) => {
  try {
    const question = await Question.findById(req.params.questionid);

    res.status(200).json({
      message: question,
    });
  } catch (error) {
    res.status(500).json({
      error: "Question not found!",
    });
  }
};

// create all questions
const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const questions = await Question.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: questions,
    });
  } catch (error) {
    res.status(500).json({
      error: "Question not found!",
    });
  }
};

// react questions
const reactQuestion = async (req: Request, res: Response) => {
  try {
    const questionid = req.params.questionid;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized!" });
    }

    const loggedInUserId = req.user.id;

    try {
      // Search for the question to react
      const questionToLike = await Question.findById(questionid); // Correctly use the ID
      if (!questionToLike) {
        return res.status(403).json({ error: "Question not found!" });
      }

      // Search for the reacted user
      const reactedUser = await User.findById(loggedInUserId); // Correctly use the ID
      if (!reactedUser) {
        return res.status(403).json({ error: "User not found!" });
      }

      // Check if the user has already reacted
      if (questionToLike.reacts.includes(loggedInUserId)) {
        return res
          .status(400)
          .json({ error: "You have already reacted to this question!" });
      }

      // Store the user ID on the reacts array
      questionToLike?.reacts.push(loggedInUserId);

      // Store the question ID on the reactions array of the user
      reactedUser?.reacts.push(questionToLike._id.toString());

      // Save the question & user
      await questionToLike.save();
      await reactedUser.save();

      res.status(200).json({ message: "Reacted to the question." });
    } catch (error) {
      res.status(500).json({
        error: "Failed to react to the question!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to react to the question!",
    });
  }
};

export { createQuestion, getAllQuestions, getQuestionById, reactQuestion };
