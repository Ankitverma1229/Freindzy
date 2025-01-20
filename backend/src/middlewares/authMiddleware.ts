import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/userModel.js";
import { RequestHandler } from "express";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    userName: string;
    profilePic: string;
  };
}

export const authenticate: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({
        success: false,
        message: "No token provided. Unauthorized.",
      });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Invalid token. Unauthorized.",
      });
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET!;
    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decodedToken) {
      res.status(401).json({
        success: false,
        message: "Invalid token. Authentication failed.",
      });
      return;
    }

    const user = await User.findById(decodedToken.id);

    if (!user || user.token !== token) {
      res.status(401).json({
        success: false,
        message: "Session expired or invalid. Please log in again.",
      });
      return;
    }

    req.user = {
      id: user._id.toString(),
      email: user.email,
      userName: user.userName,
      profilePic: user.profilePic,
    };

    next();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
    return;
  }
};
