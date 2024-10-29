import express from "express";
import { body } from "express-validator";

import {
  createComment,
  getAllComments,
} from "../controllers/commentController";

const router = express.Router();

// create a comment
// Create a comment
router.post(
  "/comment/create",
  [
    body("userid").notEmpty().withMessage("User ID is required"),
    body("username").notEmpty().withMessage("Username is required"),
    body("answer").notEmpty().withMessage("Answer is required"),
    body("questionId").notEmpty().withMessage("Question ID is required"),
  ],
  createComment
);

// Get all comments of a specific question
router.get("/comments/:questionId", getAllComments);

export default router;
