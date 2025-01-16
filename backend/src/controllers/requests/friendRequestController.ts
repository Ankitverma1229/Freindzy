import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware.js";
import Friend from "../../models/friendModel.js";
import User from "../../models/userModel.js";

export const createFriendRequest: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { id, userName, profilePic } = req.user!;
    const { requestedUserEmail } = req.body;

    if (!requestedUserEmail) {
      res.status(400).json({
        success: false,
        message: "Email is required",
      });
      return;
    }

    if (req.user?.email === requestedUserEmail) {
      res.status(400).json({
        success: false,
        message: "You can not send friend request to your own",
      });
      return;
    }

    // Check if the target user exists in the User schema
    const userDetails = await User.findOne({ email: requestedUserEmail });
    if (!userDetails) {
      res.status(404).json({
        success: false,
        message: "The requested user does not exist.",
      });
      return;
    }

    // Find or create the target user's Friend document
    let targetUser = await Friend.findOneAndUpdate(
      { email: requestedUserEmail },
      {
        $setOnInsert: {
          user: userDetails.userName,
          email: userDetails.email,
        },
      },
      { upsert: true, new: true }
    );

    if (!targetUser) {
      res.status(500).json({
        success: false,
        message: "Failed to create or retrieve the target user.",
      });
      return;
    }

    // Check if a request is already sent
    const isAlreadyRequested = targetUser?.activeRequests.some(
      (request) => request.userId.toString() === id.toString()
    );
    if (isAlreadyRequested) {
      res.status(400).json({
        success: false,
        message: "Already requested. Please wait for confirmation.",
      });
      return;
    }

    // Check if the target user is already in the requester’s friend list
    const isAlreadyFriend = targetUser?.friends.some(
      (friend) => friend.friendEmail === req.user?.email
    );
    if (isAlreadyFriend) {
      res.status(400).json({
        success: false,
        message: "You are already friends with this user.",
      });
      return;
    }

    // Add the friend request
    const updatedUser = await Friend.findOneAndUpdate(
      { email: requestedUserEmail },
      {
        $push: {
          activeRequests: {
            userId: id,
            name: userName,
            profilePic,
            friendEmail: req.user?.email,
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
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getActiveFriendRequest: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { email } = req.user!;
    const profileDetails = await Friend.findOne({ email });
    res.status(200).json({
      success: true,
      acitveRequests: profileDetails?.activeRequests,
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
export const acceptFriendRequest: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { email } = req.user!;
    const { requestedUserId } = req.body;

    if (!requestedUserId) {
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
      (req) => req.userId.toString() === requestedUserId
    );

    if (!request) {
      res.status(404).json({
        success: false,
        message: "Friend request not found.",
      });
      return;
    }

    const updateFriendsFriendList = await Friend.findOneAndUpdate(
      { email: request.friendEmail },
      {
        $push: {
          friends: {
            friendId: req.user?.id,
            friendName: req.user?.userName,
            friendEmail: req.user?.email,
            profilePic: req.user?.profilePic,
          },
        },
      },
      { new: true }
    );

    // Add the friend to the friends array
    const newFriend = {
      friendId: request.userId,
      friendName: request.name,
      friendEmail: request.friendEmail,
      profilePic: request.profilePic,
    };

    userFriendDoc.friends.push(newFriend);

    // Remove the friend from activeRequests
    userFriendDoc.activeRequests = userFriendDoc.activeRequests.filter(
      (req) => req.userId.toString() !== requestedUserId
    );

    // Save the updated document
    await userFriendDoc.save();

    res.status(200).json({
      success: true,
      message: `${request.name} is now your friend.`,
      friend: request,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const cancelFriendRequest: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { email } = req.user!;
    const { requestFriendEmail } = req.body;
    if (!requestFriendEmail) {
      res.status(400).json({
        success: false,
        message: "Email for the active request of user is required",
      });
      return;
    }

    const userFriendData = await Friend.findOneAndUpdate(
      { email },
      { $pull: { activeRequests: { friendEmail: requestFriendEmail } } },
      { new: true }
    );
    if (!userFriendData) {
      res.status(400).json({
        success: false,
        message: "Can not find any user with provided credentials",
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Request deleted successfully.",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
