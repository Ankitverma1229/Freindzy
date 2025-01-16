import { RequestHandler } from "express";
import User from "../../models/userModel.js";
import Friend from "../../models/friendModel.js";
import { generateToken } from "../../utils/generateToken.js";

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;

    if (!userName || !email || !password || !confirmPassword) {
      res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({
        success: false,
        message: "Password and confirm password do not match.",
      });
      return;
    }

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      res.status(400).json({
        success: false,
        message: "This email is already registered with another account.",
      });
      return;
    }

    const isExistingInFriends = await Friend.findOne({ email });

    const userProfile = await User.create({
      userName,
      email,
      password,
      profilePic: `https://api.dicebear.com/5.x/initials/svg?seed=${userName}`,
    });

    if (!isExistingInFriends) {
      // If user doesn't have a friends list, create one
      await Friend.create({
        user: userName,
        email: email,
      });
    }

    const payload = {
      name: userProfile.userName,
      id: userProfile._id,
      email: userProfile.email,
      profilePic: userProfile.profilePic,
    };

    const token = generateToken(payload);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered successfully.",
      user: payload,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};
