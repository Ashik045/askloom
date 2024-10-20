import express from "express";
import passport from "passport";

const router = express.Router();

interface UserWithToken {
  user: {
    displayName: string;
    id: string;
    name: {
      familyName: string;
      givenName: string;
    };
    photos: Array<{ value: string }>;
    provider: string;
    _json: {
      sub: string;
      name: string;
      given_name: string;
      family_name: string;
      picture: string;
    };
    _raw: string;
  };
  token: string;
}

router.get("/login/success", (req, res) => {
  const user = req.user as UserWithToken | undefined;

  if (user) {
    res.status(200).json({
      success: true,
      message: "Login successfull!",
      user: user.user,
      token: user.token, // Extract token
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
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  })
);

export default router;
