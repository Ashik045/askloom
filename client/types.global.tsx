interface Comment {
  commentid: string;
  userid: string;
  comment: string;
}

export interface QuestionType {
  _id: number;
  title: string;
  question: string;
  user: string;
  userTitle: string;
  tags: string[]; // Array of strings for tags
  reacts: string[]; // Array of strings for reactions
  comments: Comment[]; // Array of Comment objects
  createdAt: Date; // Date
}

export interface UserType {
  _id: number;
  name: string;
  email: string;
  about: string;
  password: string;
  profilePicture?: string;
  activities: string[];
  questions: string[];
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
