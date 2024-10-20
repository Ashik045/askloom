"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const questionController_1 = require("../controllers/questionController");
const router = express_1.default.Router();
// create a question
router.post("/question/create", questionController_1.createQuestion);
// get a question by questionId
router.get("/question/:questionid", questionController_1.getQuestionById);
// get all questions
router.get("/questions/all", questionController_1.getAllQuestions);
exports.default = router;
