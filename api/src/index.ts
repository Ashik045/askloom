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

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for session management with MongoDB store
app.use(
  session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: false, // Set to false to prevent storing sessions that are uninitialized
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
      ttl: 14 * 24 * 60 * 60, // Session expiration in seconds (14 days here)
    }),
    cookie: {
      httpOnly: true, // Ensure the cookie is not accessible via JavaScript
      secure: process.env.NODE_ENV === "production", // Only use HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session()); // This should be after cookie session

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
