import mongoose, { Document, Schema } from "mongoose";

// Define a User interface
export interface IUser extends Document {
  googleId?: string;
  email?: string;
  displayName: string;
  photoUrl?: string;
  title: string;
  about: string;
  password?: string;
  questions: string[];
  comments: string[];
  reacts: string[];
}

// Create a user schema
const userSchema: Schema = new Schema(
  {
    googleId: {
      type: String,
      sparse: true,
    },
    email: {
      type: String,
      // required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla nam eligendi quia repellendus, eum amet harum? Sequi, fugit sed reiciendis, ex nesciunt excepturi reprehenderit eum, porro corporis cumque accusamus in!",
    },
    about: {
      type: String,
      required: true,
      default: "New User",
    },
    password: { type: String },
    photoUrl: {
      type: String,
    },
    questions: {
      type: [String],
      default: [],
    },
    comments: {
      type: [String],
      default: [],
    },
    reacts: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Create a Mongoose model for users
const User = mongoose.model<IUser>("User", userSchema);

export default User;
