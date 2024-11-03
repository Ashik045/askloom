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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unReactQuestion = exports.reactQuestion = exports.getReactedUsers = exports.getQuestionsOfUser = exports.getQuestionById = exports.getAllQuestions = exports.editAQuestion = exports.DeleteAQuestion = exports.createQuestion = void 0;
const questionmodel_1 = require("../models/questionmodel");
const usermodel_1 = __importDefault(require("../models/usermodel"));
// create a new question
const createQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userId = (_a = req.userData) === null || _a === void 0 ? void 0 : _a.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized!" });
    }
    try {
        const newQuestion = yield new questionmodel_1.Question(Object.assign(Object.assign({}, req.body), { reacts: [], comments: [] }));
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
// get a new question
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
// create all questions
const getQuestionsOfUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userid } = req.params;
    try {
        const questions = yield questionmodel_1.Question.find({ userid }).sort({ createdAt: -1 });
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
exports.getQuestionsOfUser = getQuestionsOfUser;
// edit question
const editAQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userId = (_b = req.userData) === null || _b === void 0 ? void 0 : _b.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized!" });
    }
    try {
        const question = yield questionmodel_1.Question.findById(req.params.questionid);
        if ((question === null || question === void 0 ? void 0 : question.userid) && userId) {
            const updatedQuestion = Object.assign(Object.assign({}, req.body), { reacts: [], comments: [] });
            try {
                const question2 = yield questionmodel_1.Question.findByIdAndUpdate(req.params.questionid, { $set: updatedQuestion }, { new: true });
                res.status(200).json({
                    message: question2,
                });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update the question!" });
            }
        }
        else {
            res.status(500).json({ error: "You can only update your question!" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update the question!" });
    }
});
exports.editAQuestion = editAQuestion;
// delete question
const DeleteAQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const userId = (_c = req.userData) === null || _c === void 0 ? void 0 : _c.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized!" });
    }
    try {
        const question = yield questionmodel_1.Question.findById(req.params.questionid);
        if ((question === null || question === void 0 ? void 0 : question.userid) && userId) {
            try {
                yield questionmodel_1.Question.findByIdAndDelete(req.params.questionid);
                res.status(200).json({
                    message: "Question deleted.",
                });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete the question!" });
            }
        }
        else {
            res.status(500).json({ error: "You can only deleted your question!" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Failed to deleted the question!" });
    }
});
exports.DeleteAQuestion = DeleteAQuestion;
// react questions
const reactQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { questionid } = req.params;
    const userId = (_d = req.userData) === null || _d === void 0 ? void 0 : _d.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized!" });
    }
    try {
        const questionToLike = yield questionmodel_1.Question.findById(questionid);
        if (!questionToLike) {
            return res.status(404).json({ error: "Question not found!" });
        }
        const reactedUser = yield usermodel_1.default.findById(userId);
        if (!reactedUser) {
            return res.status(404).json({ error: "User not found!" });
        }
        if (questionToLike.reacts.includes(userId)) {
            return res
                .status(400)
                .json({ error: "You have already reacted to this question!" });
        }
        questionToLike.reacts.push(userId);
        reactedUser.reacts.push(questionToLike._id.toString());
        yield questionToLike.save();
        yield reactedUser.save();
        res.status(200).json({ message: "Reacted to the question." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to react to the question!" });
    }
});
exports.reactQuestion = reactQuestion;
// react questions
const unReactQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const { questionid } = req.params;
    const userId = (_e = req.userData) === null || _e === void 0 ? void 0 : _e.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized!" });
    }
    try {
        const questionToUnLike = yield questionmodel_1.Question.findById(questionid);
        if (!questionToUnLike) {
            return res.status(404).json({ error: "Question not found!" });
        }
        const reactedUser = yield usermodel_1.default.findById(userId);
        if (!reactedUser) {
            return res.status(404).json({ error: "User not found!" });
        }
        // Remove the user ID from the react array of the question
        const index = questionToUnLike === null || questionToUnLike === void 0 ? void 0 : questionToUnLike.reacts.indexOf(userId);
        if (index !== -1) {
            questionToUnLike.reacts.splice(index, 1);
        }
        // Remove the post ID from the activities array of the user
        const index2 = reactedUser === null || reactedUser === void 0 ? void 0 : reactedUser.reacts.indexOf(questionToUnLike._id.toString());
        if (index2 !== -1) {
            reactedUser.reacts.splice(index2, 1);
        }
        yield questionToUnLike.save();
        yield reactedUser.save();
        res.status(200).json({ message: "Un Reacted the question." });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to unreact to the question!" });
    }
});
exports.unReactQuestion = unReactQuestion;
const getReactedUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionid } = req.params;
    try {
        const question = yield questionmodel_1.Question.findById(questionid);
        if (!question) {
            return res.status(404).json({ error: "question not found!" });
        }
        const reactedUsersList = yield usermodel_1.default.find({ _id: { $in: question.reacts } });
        res.status(200).json({
            message: reactedUsersList,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch reactedusers!" });
    }
});
exports.getReactedUsers = getReactedUsers;
