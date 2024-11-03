"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const commentController_1 = require("../controllers/commentController");
const router = express_1.default.Router();
// create a comment
// Create a comment
router.post("/comment/create", [
    (0, express_validator_1.body)("userid").notEmpty().withMessage("User ID is required"),
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("answer").notEmpty().withMessage("Answer is required"),
    (0, express_validator_1.body)("questionId").notEmpty().withMessage("Question ID is required"),
], commentController_1.createComment);
// Get all comments of a specific question
router.get("/comments/:questionId", commentController_1.getAllComments);
exports.default = router;
