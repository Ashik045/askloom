import "passport";
import { IUser } from "../models/usermodel"; // Adjust the import path as needed

declare module "passport" {
  interface User extends IUser {} // Extend the default User interface
}

// declare module "passport" {
//   interface Authenticator {
//     serializeUser<TID>(
//       fn: (user: IUser, done: (err: any, id?: TID) => void) => void
//     ): void;
//   }
// }
