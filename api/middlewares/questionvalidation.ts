import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/usermodel";

interface AuthenticatedUser extends IUser {
  id: string; // Ensure 'id' is required
}

// Extend the Request interface
interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser; // Use the new interface here
}

export const ReactQuestionMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.slice(7); // Remove the "Bearer " prefix

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || ""
      ) as { id: string };

      // Fetch the user from the database
      const user = await User.findById(decodedToken.id);
      if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Set the user object on the request
      req.user = user as AuthenticatedUser; // Cast to AuthenticatedUser
      next();
    } catch (error) {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
