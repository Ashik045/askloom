"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/login/success", (req, res) => {
    const user = req.user;
    if (user) {
        res.status(200).json({
            success: true,
            message: "Login successfull!",
            user: user.user,
            token: user.token, // Extract token
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
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
}));
exports.default = router;
