"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const QuestionSchema = new mongoose_1.default.Schema({
    title: {
        type: "string",
        required: true,
    },
    question: {
        type: "string",
    },
    user: {
        type: "string",
        required: true,
    },
    userTitle: {
        type: "string",
    },
    tags: {
        type: [String],
        default: [],
    },
    reacts: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
const Question = mongoose_1.default.model("Question", QuestionSchema);
exports.Question = Question;
