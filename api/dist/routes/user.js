"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// user registration
router.post("/registration", userController_1.regHandler);
// manually login
router.post("/login/manual", userController_1.loginHandler);
// update a user
router.put("/user/update/:userId", userController_1.updateUser);
// get user by userId
router.get("/user/:userId", userController_1.getUserById);
// ********************************
// passportjs google auth routes and controllers
router.get("/login/success", (req, res) => {
    const user = req.user;
    if (user) {
        // Generate a new token if needed (you may want to store it in the user model)
        const token = jsonwebtoken_1.default.sign({ id: user._id, googleId: user.googleId }, process.env.JWT_SECRET_KEY || "@@&8a@zP3m6M8*Wx%", { expiresIn: "2d" });
        res.status(200).json({
            success: true,
            message: "Login successfull!",
            user,
            token, // Extract token
        });
    }
    else {
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
router.get("/google", (req, res, next) => {
    console.log("Google login initiated"); // Log request
    next();
}, passport_1.default.authenticate("google", { scope: ["profile"] }));
router.get("/google/callback", passport_1.default.authenticate("google", {
    successRedirect: "http://localhost:3000/login",
    failureRedirect: "/login/failed",
}));
exports.default = router;
