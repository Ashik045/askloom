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

export interface UserWithToken {
  user: IUser;
  token: string;
}
