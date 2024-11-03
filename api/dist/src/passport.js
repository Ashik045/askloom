"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const usermodel_1 = __importDefault(require("../models/usermodel")); // Import the User model
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID ||
        "1077098493332-137np8olfj3l8hbqeafunkgjj34f3bfa.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ||
        "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",
    callbackURL: "https://askloom-api.onrender.com/api/auth/google/callback",
    scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
    ],
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // Extract email from Google profile
        // const email = profile.emails && profile.emails[0]?.value;
        // console.log(profile);
        // console.log(email);
        // Check if the user already exists
        let user = yield usermodel_1.default.findOne({ googleId: profile.id });
        const jwtSecret = process.env.JWT_SECRET_KEY || "@@&8a@zP3m6M8*Wx%";
        if (user) {
            // Generate a JWT token
            const token = jsonwebtoken_1.default.sign({ id: user._id, googleId: user.googleId }, jwtSecret, { expiresIn: "2d" });
            // Return existing user and token
            return done(null, { user, token }); // Return user and token
        }
        // If user does not exist, create a new one
        const newUser = new usermodel_1.default({
            googleId: profile.id,
            email: "",
            displayName: profile.displayName || "Unknown User",
            photoUrl: ((_b = (_a = profile.photos) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || "",
            title: "New User",
            about: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla nam eligendi quia repellendus, eum amet harum? Sequi, fugit sed reiciendis, ex nesciunt excepturi reprehenderit eum, porro corporis cumque accusamus in!",
            password: "",
            questions: [],
            comments: [],
            reacts: [],
        });
        yield newUser.save();
        // Generate a JWT token for the new user
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, googleId: newUser.googleId }, jwtSecret, { expiresIn: "2d" });
        // Return new user and token
        return done(null, { user: newUser, token }); // Return new user and token
    }
    catch (error) {
        return done(error, undefined); // Handle error
    }
})));
// Serialize the user by saving the user ID in the session
passport_1.default.serializeUser((user, done) => {
    const userObj = user; // user contains both user and token
    done(null, userObj.user._id); // Serialize only the user ID
});
// Deserialize user.
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usermodel_1.default.findById(id);
        if (user) {
            done(null, user); // Pass the user object to the session
        }
        else {
            done(new Error("User not found"), null); // Handle user not found
        }
    }
    catch (error) {
        done(error, null); // Handle any errors during deserialization
    }
}));
// passport.serializeUser(
//   (
//     user: Express.User,
//     done: (error: any, user?: Express.User | false | null) => void
//   ) => {
//     done(null, user);
//   }
// );
// // Deserialize the user by finding the user by ID in the database
// passport.deserializeUser(async (id: string, done) => {
//   try {
//     const user = await User.findById(id); // Find the user by ID
//     if (user) {
//       done(null, user); // Pass the user to the session
//     } else {
//       done(null, false); // User not found
//     }
//   } catch (error) {
//     done(error, null); // Handle any errors
//   }
// });
