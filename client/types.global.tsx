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
