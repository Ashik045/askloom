import express from "express";

import {
  createQuestion,
  editAQuestion,
  getAllQuestions,
  getQuestionById,
  reactQuestion,
  unReactQuestion,
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

// get all questions
router.put("/question/edit/:questionid", editAQuestion);

// react a question
router.post(
  "/question/react/:questionid",
  ReactQuestionMiddleware,
  reactQuestion
);

router.post(
  "/question/unreact/:questionid",
  ReactQuestionMiddleware,
  unReactQuestion
);

export default router;
