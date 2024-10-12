import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

import questionRoute from "../routes/question";
// Initialize Express app
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
