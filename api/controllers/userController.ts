import { Request, Response } from "express";
import User from "../models/usermodel";

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userid);

    res.status(200).json({
      message: user,
    });
  } catch (error) {
    res.status(500).json({
      error: "user not found!",
    });
  }
};

export { getUserById };
