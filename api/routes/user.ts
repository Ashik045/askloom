import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import {
  getUserById,
  loginHandler,
  regHandler,
  updateUser,
} from "../controllers/userController";
import { IUser } from "../models/usermodel";

const router = express.Router();

// user registration
router.post("/registration", regHandler);

// manually login
router.post("/login/manual", loginHandler);

// update a user
router.put("/user/update/:userId", updateUser);

// get user by userId
router.get("/user/:userId", getUserById);

// ********************************
// passportjs google auth routes and controllers
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

  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? process.env.CLIENT_URL_DEV || "http://localhost:3000"
      : process.env.CLIENT_URL_PRODUCTION || "https://askloom.vercel.app";
  res.redirect(redirectUrl);
});

console.log("route.ts", process.env.NODE_ENV);

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
    successRedirect:
      process.env.NODE_ENV === "development"
        ? `${process.env.CLIENT_URL_DEV || "http://localhost:3000"}/login`
        : `${process.env.CLIENT_URL_PRODUCTION || "https://askloom.vercel.app"}/login`,
    failureRedirect: "/login/failed",
  })
);

export default router;
