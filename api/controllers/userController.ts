import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from "../models/usermodel";

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      message: user.toObject(),
    });
  } catch (error) {
    res.status(500).json({
      error: "user not found!",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  // const username = req.body.username;
  // const isUser = await User.findOne({ username: username });
  const userid = await req.params.userId;
  const existingUser = await User.findOne({ userid });

  try {
    // Check if the user exists
    if (!existingUser) {
      return res.status(404).json({ error: "User not found!" });
    }

    if (existingUser?._id !== userid) {
      return res
        .status(403)
        .json({ error: "You can only update your own account!" });
    }

    // Hash the password if it was provided
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update the user
    const updatedUser = await User.findOneAndUpdate(
      { userid },
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      message: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user!" });
  }
};

export { getUserById, updateUser };
