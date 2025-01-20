import { RequestHandler } from "express";
import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/generateToken.js";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware.js";

export const loginUser: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, message: "No account found" });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const payload = {
      name: user.userName,
      email: user.email,
      profilePic: user.profilePic,
      id: user._id,
    };

    const token = generateToken(payload);

    user.token = token;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const logoutUser: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);

    if (user) {
      user.token = "";
      await user.save();
    }

    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
