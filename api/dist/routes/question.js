"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionController_1 = require("../controllers/questionController");
const questionvalidation_1 = require("../middlewares/questionvalidation");
const router = express_1.default.Router();
// create a question
router.post("/question/create", questionvalidation_1.QuestionValidation, questionController_1.createQuestion);
// get a question by questionId
router.get("/question/:questionid", questionController_1.getQuestionById);
// get all questions
router.get("/questions/all", questionController_1.getAllQuestions);
// get all questions
router.get("/questions/all/:userid", questionController_1.getQuestionsOfUser);
// edit question
router.put("/question/edit/:questionid", questionvalidation_1.QuestionValidation, questionController_1.editAQuestion);
// delete question
router.delete("/question/delete/:questionid", questionvalidation_1.QuestionValidation, questionController_1.DeleteAQuestion);
// react a question
router.post("/question/react/:questionid", questionvalidation_1.ReactQuestionMiddleware, questionController_1.reactQuestion);
// unreact a question
router.post("/question/unreact/:questionid", questionvalidation_1.ReactQuestionMiddleware, questionController_1.unReactQuestion);
// fetch the reacted users list of a perticular post
router.get("/question/:questionid/reacts", questionController_1.getReactedUsers);
exports.default = router;
