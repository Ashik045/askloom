import mongoose from "mongoose";

export interface QuestionType {
  title: string;
  question: string;
  userid: string;
  user: string;
  userTitle: string;
  userPhoto: string;
  tags: string[]; // Array of strings for tags
  reacts: string[]; // Array of strings for reactions
  comments: string[]; // Array of Comment objects
}

const QuestionSchema = new mongoose.Schema<QuestionType>(
  {
    title: {
      type: String,
      required: true,
    },
    question: {
      type: String,
    },
    userid: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    userTitle: {
      type: String,
    },
    userPhoto: {
      type: String,
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
