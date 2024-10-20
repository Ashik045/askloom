"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuestionById = exports.getAllQuestions = exports.createQuestion = void 0;
const questionmodel_1 = require("../models/questionmodel");
// create a new question
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newQuestion = yield new questionmodel_1.Question(Object.assign({}, req.body));
        newQuestion.save();
        res.status(200).json({
            message: newQuestion,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Error creating question!",
        });
    }
});
exports.createQuestion = createQuestion;
// create a new question
const getQuestionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const question = yield questionmodel_1.Question.findById(req.params.questionid);
        res.status(200).json({
            message: question,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Question not found!",
        });
    }
});
exports.getQuestionById = getQuestionById;
// create all questions
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const questions = yield questionmodel_1.Question.find().sort({ createdAt: -1 });
        res.status(200).json({
            message: questions,
        });
    }
    catch (error) {
        res.status(500).json({
            error: "Question not found!",
        });
    }
});
exports.getAllQuestions = getAllQuestions;
