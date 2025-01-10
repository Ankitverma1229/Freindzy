import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware.js";
import Friend from "../../models/friendModel.js";

export const createFriendRequest: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { id, userName, profilePic } = req.user!;
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    if (req.user?.email === email) {
      res.status(400).json({
        success: false,
        message: "You can not send friend request to your own",
      });
      return;
    }

    // Check if the email exists in the Friend collection
    const targetUser = await Friend.findOne({ email });
    if (!targetUser) {
      res.status(404).json({
        success: false,
        message: "The user you are trying to add does not exist.",
      });
      return;
    }

    // Check if a request is already sent
    const isAlreadyRequested = targetUser.activeRequests.some(
      (request) => request.userId.toString() === id.toString()
    );
    if (isAlreadyRequested) {
      res.status(400).json({
        success: false,
        message: "Already requested. Please wait for confirmation.",
      });
      return;
    }

    // Add the friend request
    const updatedUser = await Friend.findOneAndUpdate(
      { email },
      {
        $push: {
          activeRequests: {
            userId: id,
            name: userName,
            profilePic,
            accepted: false,
          },
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Friend request sent successfully.",
      updatedUser,
    });
    return;
  } catch (error: any) {
    console.error("Error in createFriendRequest:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const acceptFriendRequest: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { email } = req.user!;
    const { requestUserId } = req.body;

    if (!requestUserId) {
      res.status(400).json({
        success: false,
        message: "Request user ID is required.",
      });
      return;
    }

    // Find the current user's friend document
    const userFriendDoc = await Friend.findOne({ email });
    if (!userFriendDoc) {
      res.status(404).json({
        success: false,
        message: "User friend document not found.",
      });
      return;
    }

    // Find the friend request in activeRequests
    const request = userFriendDoc.activeRequests.find(
      (req) => req.userId.toString() === requestUserId
    );

    if (!request) {
      res.status(404).json({
        success: false,
        message: "Friend request not found.",
      });
      return;
    }

    // Add the friend to the friends array
    const newFriend = {
      friendId: request.userId,
      friendName: request.name,
      profilePic: request.profilePic,
    };

    userFriendDoc.friends.push(newFriend);

    // Remove the friend from activeRequests
    userFriendDoc.activeRequests = userFriendDoc.activeRequests.filter(
      (req) => req.userId.toString() !== requestUserId
    );

    // Save the updated document
    await userFriendDoc.save();

    res.status(200).json({
      success: true,
      message: `${request.name} is now your friend.`,
      friend: newFriend,
    });
  } catch (error: any) {
    console.error("Error in acceptFriendRequest:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
