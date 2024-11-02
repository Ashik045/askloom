import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/usermodel";

// create a new user
const regHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    // check if useremail or username is already in use
    if (!user) {
      // hashing the password
      const hashPassword = await bcrypt.hash(password, 10);

      // create a new user object
      const newUser = await new User({
        ...req.body,
        googleId: null, // Explicitly set googleId to null
        password: hashPassword,
        questions: [],
        comments: [],
        reacts: [],
      });

      newUser.save();

      // create the jwt token
      const jwtSecret: Secret = process.env.JWT_SECRET_KEY || "";
      const payload = {
        id: newUser._id,
        email: newUser.email,
      };
      const jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: "2d" });

      res.status(200).json({
        message: "User registration successfull.",
        user: newUser,
        token: jwtToken,
      });
    } else {
      res.status(500).json({
        error: "Email already in use!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "User registration failed!",
    });
  }
};

// user login
const loginHandler = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // check if the email matches
    const user = await User.findOne({ email: email });

    if (user && user.password) {
      // check if the password is correct
      const isRightPassword = await bcrypt.compare(password, user.password);

      // if the password is correct then login and send the user as a result
      if (isRightPassword) {
        const { password: _pw, ...userDetail } = user.toObject();

        // create the jwt token
        const jwtSecret: Secret = process.env.JWT_SECRET_KEY || "";
        const payload = {
          id: user._id,
          email: user.email,
        };
        const jwtToken = jwt.sign(payload, jwtSecret, { expiresIn: "2d" });

        res.status(200).json({
          message: "Login successfull.",
          user: userDetail,
          token: jwtToken,
        });
      } else {
        res.status(401).json({
          error: "Incorrect email or password!",
        });
      }
    } else {
      res.status(401).json({
        error: "Incorrect email or password!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Login failed!",
    });
  }
};

// get user by id
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
  const existingUser = await User.findById(userid);

  try {
    // Check if the user exists
    if (!existingUser) {
      return res.status(404).json({ error: "User not found!!" });
    }

    const newUserId = (existingUser?._id || "")?.toString();
    if (newUserId !== userid) {
      return res
        .status(403)
        .json({ error: "You can only update your own account!" });
    }

    // Hash the password if it was provided
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const userToSave = {
      ...req.body,
      questions: [],
      comments: [],
      reacts: [],
    };

    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userid,
      {
        $set: userToSave,
      },
      { new: true }
    );

    res.status(200).json({
      user: updatedUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user!" });
  }
};

export { getUserById, loginHandler, regHandler, updateUser };
