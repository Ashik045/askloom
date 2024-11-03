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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.regHandler = exports.loginHandler = exports.getUserById = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
// create a new user
const regHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield usermodel_1.default.findOne({ email: email });
        // check if useremail or username is already in use
        if (!user) {
            // hashing the password
            const hashPassword = yield bcrypt_1.default.hash(password, 10);
            // create a new user object
            const newUser = yield new usermodel_1.default(Object.assign(Object.assign({}, req.body), { googleId: null, password: hashPassword, questions: [], comments: [], reacts: [] }));
            newUser.save();
            // create the jwt token
            const jwtSecret = process.env.JWT_SECRET_KEY || "";
            const payload = {
                id: newUser._id,
                email: newUser.email,
            };
            const jwtToken = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: "2d" });
            res.status(200).json({
                message: "User registration successfull.",
                user: newUser,
                token: jwtToken,
            });
        }
        else {
            res.status(500).json({
                error: "Email already in use!",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: "User registration failed!",
        });
    }
});
exports.regHandler = regHandler;
// user login
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // check if the email matches
        const user = yield usermodel_1.default.findOne({ email: email });
        if (user && user.password) {
            // check if the password is correct
            const isRightPassword = yield bcrypt_1.default.compare(password, user.password);
            // if the password is correct then login and send the user as a result
            if (isRightPassword) {
                const _a = user.toObject(), { password: _pw } = _a, userDetail = __rest(_a, ["password"]);
                // create the jwt token
                const jwtSecret = process.env.JWT_SECRET_KEY || "";
                const payload = {
                    id: user._id,
                    email: user.email,
                };
                const jwtToken = jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: "2d" });
                res.status(200).json({
                    message: "Login successfull.",
                    user: userDetail,
                    token: jwtToken,
                });
            }
            else {
                res.status(401).json({
                    error: "Incorrect email or password!",
                });
            }
        }
        else {
            res.status(401).json({
                error: "Incorrect email or password!",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            error: "Login failed!",
        });
    }
});
exports.loginHandler = loginHandler;
// get user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usermodel_1.default.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({
            message: user.toObject(),
        });
    }
    catch (error) {
        res.status(500).json({
            error: "user not found!",
        });
    }
});
exports.getUserById = getUserById;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // const username = req.body.username;
    // const isUser = await User.findOne({ username: username });
    const userid = yield req.params.userId;
    const existingUser = yield usermodel_1.default.findById(userid);
    try {
        // Check if the user exists
        if (!existingUser) {
            return res.status(404).json({ error: "User not found!!" });
        }
        const newUserId = (_b = ((existingUser === null || existingUser === void 0 ? void 0 : existingUser._id) || "")) === null || _b === void 0 ? void 0 : _b.toString();
        if (newUserId !== userid) {
            return res
                .status(403)
                .json({ error: "You can only update your own account!" });
        }
        // Hash the password if it was provided
        if (req.body.password) {
            req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        }
        const userToSave = Object.assign(Object.assign({}, req.body), { questions: [], comments: [], reacts: [] });
        // Update the user
        const updatedUser = yield usermodel_1.default.findByIdAndUpdate(userid, {
            $set: userToSave,
        }, { new: true });
        res.status(200).json({
            user: updatedUser,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while updating the user!" });
    }
});
exports.updateUser = updateUser;
