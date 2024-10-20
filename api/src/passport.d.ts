import "passport";
import { IUser } from "../models/usermodel"; // Adjust the import path as needed

declare module "passport" {
  interface User extends IUser {} // Extend the default User interface
}
