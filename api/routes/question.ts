import express from "express";

import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
} from "../controllers/questionController";

const router = express.Router();

// create a question
router.post("/question/create", createQuestion);

// get a question by questionId
router.get("/question/:questionid", getQuestionById);

// get all questions
router.get("/questions/all", getAllQuestions);

export default router;
