import mongoose, { Document, Schema } from "mongoose";

// Define a User interface
export interface IUser extends Document {
  googleId: string;
  displayName: string;
  photoUrl: string;
  about: string;
  password: string;
  questions: string[];
  comments: string[];
  reacts: string[];
}

// Create a user schema
const userSchema: Schema = new Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
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
