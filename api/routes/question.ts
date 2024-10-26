import express from "express";

import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  reactQuestion,
} from "../controllers/questionController";

import { ReactQuestionMiddleware } from "../middlewares/questionvalidation";

const router = express.Router();

// create a question
router.post("/question/create", createQuestion);

// get a question by questionId
router.get("/question/:questionid", getQuestionById);

// get all questions
router.get("/questions/all", getAllQuestions);

// get all questions
router.get("/questions/all", getAllQuestions);

// react a question
router.post(
  "/question/react/:questionid",
  ReactQuestionMiddleware,
  reactQuestion
);

export default router;
