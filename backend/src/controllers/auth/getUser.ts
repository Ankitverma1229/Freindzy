import { RequestHandler } from "express";
import User from "../../models/userModel.js";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware.js";

export const getUserDetials: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    if (!req.user) {
      res.status(400).json({
        success: false,
        message: "Unable to fetch user details",
      });
      return;
    }

    const { userName, email, id, profilePic } = req.user!;

    const userDetails = {
      userName,
      email,
      id,
      profilePic,
    };

    res.status(200).json({
      success: true,
      userDetails,
    });
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
    if (!req.user) {
      res.status(400).json({
        success: false,
        message: "Unable to fetch all users",
      });
      return;
    }

    const { email } = req.user;

    const allUsers = await User.find({}, "-_id userName email profilePic");

    const result = allUsers.filter(
      (userDetails) => userDetails.email !== email
    );

    res.status(200).json({
      success: true,
      allUsers: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};
