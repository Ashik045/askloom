"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const question_1 = __importDefault(require("../routes/question"));
const user_1 = __importDefault(require("../routes/user"));
// Import the Google strategy file
require("./passport");
// Initialize Express app
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // Allow sending cookies from client
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session()); // This should be after cookie session
// server connect to database
mongoose_1.default
    .connect(`${process.env.MONGODB_CONNECTION_STRING}`)
    .then(() => {
    console.log("MongoDB connection successful");
})
    .catch((err) => {
    console.log(err);
});
// Application route.
app.get("/", (req, res) => {
    res.status(200).json({ message: "Ok" });
});
// questions route
app.use("/api", question_1.default);
// user route
app.use("/api/auth", user_1.default);
// Error handling: 404
app.use((req, res) => {
    res.status(404).json({ error: "Requested URL not found!" });
});
// Default error handler
app.use((err, req, res, next) => {
    console.error(err); // Log the actual error
    res.status(500).json({ error: "Internal Server Error!!" });
});
// Start the server
const port = process.env.APPLICATION_PORT || 4000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
