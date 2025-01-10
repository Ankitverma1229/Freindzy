import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./configs/connectDB.js";
import userRouter from "./routes/userRoutes.js";
import friendRouter from "./routes/friendRoutes.js";

dotenv.config();

const PORT = Number(process.env.PORT!) || 5555;
const DatabaseUrl = String(process.env.MONGO_URI);

connectDB(DatabaseUrl);

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRouter);
app.use("/api/friend", friendRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome server is working perfect");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log("Connecting DB...");
});
