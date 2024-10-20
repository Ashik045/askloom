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
        "1077098493332-k62gepmg9c4tg8eb53fqi7adhhbk70fh.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ||
        "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",
    callbackURL: "http://localhost:4000/api/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let existingUser = yield usermodel_1.default.findOne({ googleId: profile.id });
        const jwtSecret = process.env.JWT_SECRET_KEY || "YOUR_JWT_SECRET";
        if (existingUser) {
            const token = jsonwebtoken_1.default.sign({ id: existingUser._id, googleId: existingUser.googleId }, jwtSecret, { expiresIn: "2d" });
            return done(null, { _id: existingUser._id, token }); // Only return the _id and token
        }
        const newUser = new usermodel_1.default({
            googleId: profile.id,
            displayName: profile.displayName || profile.username || "Unknown User",
            photoUrl: ((_b = (_a = profile.photos) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.value) || "",
            about: "",
            password: "",
            questions: [],
            comments: [],
            reacts: [],
        });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, googleId: newUser.googleId }, jwtSecret, { expiresIn: "2d" });
        return done(null, { _id: newUser._id, token }); // Only return the _id and token
    }
    catch (error) {
        return done(error);
    }
})));
// Serialize the user by saving the user ID in the session
passport_1.default.serializeUser((user, done) => {
    done(null, user._id); // Only store the user ID in the session
});
// Deserialize the user by finding the user by ID in the database
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usermodel_1.default.findById(id);
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    }
    catch (error) {
        done(error, null);
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
