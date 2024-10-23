import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { IUser } from "../models/usermodel";

const router = express.Router();

interface UserWithToken {
  user: IUser;
  token: string;
}

router.get("/login/success", (req, res) => {
  const user = req.user as IUser | undefined;

  if (user) {
    // Generate a new token if needed (you may want to store it in the user model)
    const token = jwt.sign(
      { id: user._id, googleId: user.googleId },
      process.env.JWT_SECRET_KEY || "@@&8a@zP3m6M8*Wx%",
      { expiresIn: "2d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successfull!",
      user,
      token, // Extract token
    });
  } else {
    res.status(401).json({
      success: false,
      message: "User not authenticated!",
    });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err); // Handle any potential errors
    }
  });
  res.redirect("http://localhost:3000");
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "Login failed!",
  });
});

// create a User
router.get(
  "/google",
  (req, res, next) => {
    console.log("Google login initiated"); // Log request
    next();
  },
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/login",
    failureRedirect: "/login/failed",
  })
);

export default router;
