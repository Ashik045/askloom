"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Create a user schema
const userSchema = new mongoose_1.Schema({
    googleId: {
        type: String,
        sparse: true,
    },
    email: {
        type: String,
        // required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        default: "New User",
    },
    about: {
        type: String,
        required: true,
        default: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla nam eligendi quia repellendus, eum amet harum? Sequi, fugit sed reiciendis, ex nesciunt excepturi reprehenderit eum, porro corporis cumque accusamus in!",
    },
    password: { type: String },
    photoUrl: {
        type: String,
    },
    questions: {
        type: [String],
        default: [],
    },
    comments: {
        type: [String],
        default: [],
    },
    reacts: {
        type: [String],
        default: [],
    },
}, { timestamps: true });
// Create a Mongoose model for users
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
