import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "Login successfull!",
      user: req.user,
      // cookies: req.cookies,
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
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  })
);

export default router;
