import { RequestHandler } from "express";
import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
      return;
    }

    const isExistingUser = await User.findOne({ email });
    if (!isExistingUser) {
      res.status(404).json({
        success: false,
        message: "No account available with provided credentials",
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      isExistingUser.password
    );
    if (!isPasswordCorrect) {
      res.status(404).json({
        success: false,
        message: "Incorrect credentials",
      });
      return;
    }

    const payload = {
      name: isExistingUser.userName,
      email: isExistingUser.email,
      profilePic: isExistingUser.profilePic,
      id: isExistingUser._id,
    };

    const token = generateToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successfull...",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      messsage: "Internal server error",
      error: error.message,
    });
  }
};

export const logoutUser: RequestHandler = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
