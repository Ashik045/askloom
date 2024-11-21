import MongoStore from "connect-mongo";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import commentRoute from "../routes/comment";
import questionRoute from "../routes/question";
import authRoute from "../routes/user";

// Import the Google strategy file
import "./passport";

// Initialize Express app
dotenv.config();
const app = express();

// Environment variables for clarity
const SESSION_SECRET =
  process.env.SECRET_KEY || "3#asv$6Pb@%mPLcYpWqt@#s45Ju%PDrk147@@BjiKl";
const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

// Ensure essential environment variables are loaded
if (!SESSION_SECRET || !MONGODB_URI) {
  throw new Error("Missing essential environment variables.");
}

// Middleware.
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.CLIENT_URL_DEV
        : process.env.CLIENT_URL_PRODUCTION, // Allow requests from client URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies to be sent with requests
  })
);

console.log("index.ts", process.env.NODE_ENV);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for session management with MongoDB store
// Middleware for session management with MongoDB store
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGODB_URI,
      ttl: 14 * 24 * 60 * 60, // Session expiration
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// server connect to database
mongoose
  .connect(`${process.env.MONGODB_CONNECTION_STRING}`)
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch((err: object) => {
    console.log(err);
  });

// Application route.
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Ok" });
});

// questions route
app.use("/api", questionRoute);

// questions route
app.use("/api", commentRoute);

// user route
app.use("/api/auth", authRoute);

// Error handling: 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Requested URL not found!" });
});

// Default error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err); // Log the actual error
  res.status(500).json({ error: "Internal Server Error!!" });
});

// Start the server
const port = process.env.APPLICATION_PORT || 4000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
