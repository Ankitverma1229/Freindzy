import { RequestHandler } from "express";
import User from "../../models/userModel.js";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware.js";

export const getUserDetials: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { userName, email, id, profilePic } = req.user!;
    const userDetails = {
      userName: userName,
      email: email,
      id: id,
      profilePic: profilePic,
    };
    if (!req.user) {
      res.status(400).json({
        success: false,
        message: "unable to fetch user details",
      });
      return;
    }
    res.status(200).json({
      success: true,
      userDetails,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const getAllUser: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { email } = req.user!;
    const allUsers = await User.find({}, "-_id userName email profilePic");
    const result = allUsers.filter(
      (userDetails) => userDetails.email !== email
    );
    res.status(200).json({
      success: true,
      allUsers: result,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};
