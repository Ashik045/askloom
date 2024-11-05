import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  userData?: { id: string };
}

export const QuestionValidation = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.slice(7);

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || ""
      ) as { id: string };

      req.userData = { id: decodedToken.id };
      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export const ReactQuestionMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
    const token = authorizationHeader.slice(7);

    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || ""
      ) as { id: string };

      req.userData = { id: decodedToken.id }; // Set user ID on `userData`
      next();
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }
};

export const QuestionTagValidation = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tags } = req.body;
    // Validate each tag in the array
    for (const tag of tags) {
      // Check if tag length is between 1 and 25 characters
      if (tag.length < 1 || tag.length > 25) {
        return res
          .status(400)
          .json({ error: "Each tag should be between 1 and 25 characters." });
      }
      // Check if the tag contains spaces
      if (tag.includes(" ")) {
        return res
          .status(400)
          .json({ error: "Tags should not contain spaces." });
      }
    }

    // If all tags are valid, proceed to the next middleware or controller
    next();
  } catch (error) {
    return res.status(500).json({ error: "Invalid tags" });
  }
};
