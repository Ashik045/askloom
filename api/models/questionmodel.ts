import mongoose from "mongoose";

export interface QuestionType {
  _id: number;
  title: string;
  question: string;
  user: string;
  userTitle: string;
  tags: string[]; // Array of strings for tags
  reacts: string[]; // Array of strings for reactions
  comments: Comment[]; // Array of Comment objects
}

const QuestionSchema = new mongoose.Schema<QuestionType>(
  {
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
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", QuestionSchema);

export { Question };
