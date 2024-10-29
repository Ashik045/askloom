interface Comment {
  commentid: string;
  userid: string;
  comment: string;
}

export interface QuestionType {
  _id: string;
  title: string;
  question: string;
  user: string;
  userid: string;
  userTitle: string;
  tags: string[]; // Array of strings for tags
  reacts: string[]; // Array of strings for reactions
  comments: Comment[]; // Array of Comment objects
  createdAt: Date; // Date
}

export interface UserType {
  _id: string;
  email: string;
  googleId: string;
  displayName: string;
  photoUrl: string;
  title: string;
  about: string;
  password?: string;
  questions: string[];
  comments: string[];
  reacts: string[];
  createdAt: Date; // Date
}

export type State = {
  user: null | UserType;
  isLoading: boolean;
  error: null | string;
  dispatch: React.Dispatch<Action>;
};

export type Action =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: State["user"] }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "USER_UPDATE_START" }
  | { type: "USER_UPDATE_SUCCESS"; payload: State["user"] }
  | { type: "USER_UPDATE_FAILURE"; payload: string };

export type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  fullname: string;
  about: string;
  title: string;
  phone: string;
  location: string;
  facebook: string;
  profession: string;
};

export interface CommentType {
  userid: string;
  username: string;
  userphoto: string;
  answer: string;
  questionId: string;
  createdAt: Date; // Date
}
