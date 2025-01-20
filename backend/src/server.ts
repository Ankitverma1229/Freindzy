import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./configs/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import friendRouter from "./routes/friendRoutes.js";

dotenv.config();

const PORT = Number(process.env.PORT!) || 5555;
const DatabaseUrl = String(process.env.MONGO_URI);
const clientUrl = process.env.FRONTEND_URL;

connectDB(DatabaseUrl);

const app = express();

app.use(
  cors({
    origin: clientUrl?.endsWith("/") ? clientUrl.slice(0, -1) : clientUrl, // Ensure no trailing slash in the URL
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/friend", friendRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome! Server is running perfectly.");
});

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong. Please try again later.",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Connecting to the database...");
});
