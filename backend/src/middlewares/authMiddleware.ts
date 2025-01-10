import jwt, { JwtPayload } from "jsonwebtoken";
import User, { IUser } from "../models/userModel.js";
import { RequestHandler } from "express";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  user?: IUser;
}

export const authenticate: RequestHandler = async (
  req: AuthenticatedRequest,
  res,
  next
) => {
  try {
    const token = String(req.cookies.token);

    if (!token) {
      res.status(403).json({
        success: false,
        message: "Session expired, kindly log in again.",
      });
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET!;
    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decodedToken) {
      res.status(401).json({
        success: false,
        message: "Invalid token, authentication failed.",
      });
      return;
    }
    const user = await User.findById(decodedToken.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found, authentication failed.",
      });
      return;
    }

    req.user = user;

    next();
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Authentication failed.",
      error: error.message,
    });
  }
};
