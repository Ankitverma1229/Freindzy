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

    userProfile.token = token;
    await userProfile.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: payload,
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
    return;
  }
};
