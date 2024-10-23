// src/types/express.d.ts

import { IUser } from "../models/usermodel";

declare global {
  namespace Express {
    interface User extends IUser {}
  }
}
