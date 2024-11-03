"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactQuestionMiddleware = exports.QuestionValidation = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const QuestionValidation = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
        const token = authorizationHeader.slice(7);
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "");
            req.userData = { id: decodedToken.id };
            next();
        }
        catch (error) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
    }
    else {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};
exports.QuestionValidation = QuestionValidation;
const ReactQuestionMiddleware = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader && authorizationHeader.startsWith("Bearer ")) {
        const token = authorizationHeader.slice(7);
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || "");
            req.userData = { id: decodedToken.id }; // Set user ID on `userData`
            next();
        }
        catch (error) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
    }
    else {
        return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
};
exports.ReactQuestionMiddleware = ReactQuestionMiddleware;
