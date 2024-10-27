import express from "express";

import {
  createQuestion,
  DeleteAQuestion,
  editAQuestion,
  getAllQuestions,
  getQuestionById,
  reactQuestion,
  unReactQuestion,
} from "../controllers/questionController";

import {
  QuestionValidation,
  ReactQuestionMiddleware,
} from "../middlewares/questionvalidation";

const router = express.Router();

// create a question
router.post("/question/create", QuestionValidation, createQuestion);

// get a question by questionId
router.get("/question/:questionid", getQuestionById);

// get all questions
router.get("/questions/all", getAllQuestions);

// get all questions
router.get("/questions/all", getAllQuestions);

// edit question
router.put("/question/edit/:questionid", QuestionValidation, editAQuestion);

// delete question
router.delete(
  "/question/delete/:questionid",
  QuestionValidation,
  DeleteAQuestion
);

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
