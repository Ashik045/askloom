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
  tags: string[]; // Array of strings for tags
  reacts: string[]; // Array of strings for reactions
  comments: Comment[]; // Array of Comment objects
}
