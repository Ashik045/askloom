import { Request, Response } from "express";
import { Question } from "../models/questionmodel";

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

export { createQuestion, getAllQuestions, getQuestionById };
