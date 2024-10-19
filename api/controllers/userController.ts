import { Request, Response } from "express";

const loginUser = (req: Request, res: Response) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Login successfull!",
      user: req.user,
      // cookies: req.cookies,
    });
  }
};

export { loginUser };
