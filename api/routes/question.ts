import express from "express";

import {
  createQuestion,
  DeleteAQuestion,
  editAQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionsOfUser,
  getQuestionsTags,
  getReactedUsers,
  getTrendingQuestions,
  reactQuestion,
  unReactQuestion,
} from "../controllers/questionController";

import {
  QuestionTagValidation,
  QuestionValidation,
  ReactQuestionMiddleware,
} from "../middlewares/questionvalidation";

const router = express.Router();

// create a question
router.post(
  "/question/create",
  QuestionValidation,
  QuestionTagValidation,
  createQuestion
);

// get a question by questionId
router.get("/question/:questionid", getQuestionById);

// get all questions
router.get("/questions/all", getAllQuestions);

// get all questions
router.get("/questions/all/:userid", getQuestionsOfUser);

// edit question
router.put(
  "/question/edit/:questionid",
  QuestionValidation,
  QuestionTagValidation,
  editAQuestion
);

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

// unreact a question
router.post(
  "/question/unreact/:questionid",
  ReactQuestionMiddleware,
  unReactQuestion
);

// fetch the reacted users list of a perticular post
router.get("/question/:questionid/reacts", getReactedUsers);

// fetch the tags lists
router.get("/questions/tags", getQuestionsTags);

// fetch the trending questions list
router.get("/questions/trending", getTrendingQuestions);

export default router;
