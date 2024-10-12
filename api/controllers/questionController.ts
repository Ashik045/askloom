import { Request, Response } from "express";

// create a new question
const createQuestion = (req: Request, res: Response) => {
  res.status(200).json({
    message: "okay",
  });
};

// create a new question
const getQuestionById = (req: Request, res: Response) => {
  res.status(200).json({
    message: "okay.",
  });
};

export { createQuestion, getQuestionById };
