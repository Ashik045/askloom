import cookieSession from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import mongoose from "mongoose";

import passport from "passport";
import questionRoute from "../routes/question";
// Initialize Express app
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({ name: "session", keys: ["dev"], maxAge: 24 * 60 * 60 * 100 })
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

// Application route
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Ok" });
});

app.use("/api", questionRoute);

// Error handling: 404
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Requested URL not found!" });
});

// Default error handler
app.use((err: Error, req: Request, res: Response, next: Function) => {
  res.status(500).json({ error: "Internal Server Error!" });
});

// Start the server
const port = process.env.APPLICATION_PORT || 4000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
