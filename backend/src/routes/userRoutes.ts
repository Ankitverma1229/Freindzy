import express from "express";
import { loginUser, logoutUser } from "../controllers/auth/loginLogoutUser.js";
import { registerUser } from "../controllers/auth/registerUser.js";
import { getAllUser, getUserDetials } from "../controllers/auth/getUser.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/user-details", authenticate, getUserDetials);
userRouter.get("/all-user", authenticate, getAllUser);
userRouter.post("/logout", logoutUser);

export default userRouter;
