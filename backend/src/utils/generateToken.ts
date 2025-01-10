import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";

type User = {
  name: string;
  id: ObjectId;
  email: string;
  profilePic: string;
};

export const generateToken = (payload: User): string => {
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};
