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
exports.getAllComments = exports.createComment = void 0;
const express_validator_1 = require("express-validator");
const commentmodel_1 = __importDefault(require("../models/commentmodel"));
const questionmodel_1 = require("../models/questionmodel");
const usermodel_1 = __importDefault(require("../models/usermodel"));
// create a new comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { userid, username, userphoto, answer, questionId } = req.body;
    try {
        const questionToComment = yield questionmodel_1.Question.findById(questionId);
        if (!questionToComment) {
            return res.status(404).json({ error: "Question not found!" });
        }
        const userToAddCommentid = yield usermodel_1.default.findById(userid);
        if (!userToAddCommentid) {
            return res.status(404).json({ error: "User not found!" });
        }
        const newComment = new commentmodel_1.default({
            userid,
            username,
            userphoto,
            answer,
            questionId,
        });
        yield newComment.save();
        const commentIdString = String(newComment._id);
        questionToComment.comments.push(commentIdString);
        userToAddCommentid.comments.push(commentIdString);
        yield questionToComment.save();
        yield userToAddCommentid.save();
        return res.status(201).json({ message: newComment });
    }
    catch (error) {
        return res.status(500).json({ error: "Error creating comment!" });
    }
});
exports.createComment = createComment;
// get all comments
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId } = req.params;
    if (!questionId) {
        return res.status(400).json({ error: "questionId is required" });
    }
    try {
        const comments = yield commentmodel_1.default.find({ questionId }).sort({ createdAt: -1 });
        return res.status(200).json({
            message: comments,
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Failed to fetch the comments!" });
    }
});
exports.getAllComments = getAllComments;
