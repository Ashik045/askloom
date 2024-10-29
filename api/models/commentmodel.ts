import mongoose, { Document, Model, Schema } from "mongoose";

export interface CommentType extends Document {
  userid: string;
  username: string;
  userphoto: string;
  answer: string;
  questionId: string;
}

const CommentSchema = new Schema<CommentType>(
  {
    userid: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    questionId: {
      type: String,
      required: true,
    },
    userphoto: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comment: Model<CommentType> = mongoose.model<CommentType>(
  "Comment",
  CommentSchema
);

export default Comment;
