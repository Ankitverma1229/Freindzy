import express from "express";
import { loginUser } from "../controllers/auth/loginUser.js";
import { registerUser } from "../controllers/auth/registerUser.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
