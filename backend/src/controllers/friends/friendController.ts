import { RequestHandler } from "express";
import { AuthenticatedRequest } from "../../middlewares/authMiddleware.js";
import Friend from "../../models/friendModel.js";

export const getAllFriends: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { email } = req.user!;
    const isUserExists = await Friend.findOne({ email }).populate(
      "friends.friendId"
    );
    if (!isUserExists) {
      res.status(400).json({
        success: false,
        message: "No user exists with provided credntials",
      });
      return;
    }
    res.status(200).json({
      success: true,
      friends: isUserExists.friends,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
  const { email } = req.user!;
  const isUserExists = await Friend.findOne({ email });
  if (!isUserExists) {
    res.status(400).json({
      success: false,
      message: "No user exists with provided credntials",
    });
    return;
  }
  res.status(200).json({
    success: true,
    friends: isUserExists.friends,
  });
};

export const addNewFriend: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { userName, email } = req.user!;
    const { friendId, friendName, profilePic } = req.body;

    if (!friendId || !friendName) {
      res.status(400).json({
        success: false,
        message: "No friend details found",
      });
      return;
    }

    // Check if user already has a friends list
    const isExistingUser = await Friend.findOne({ email });

    if (!isExistingUser) {
      // If user doesn't have a friends list, create one
      const newUser = await Friend.create({
        user: userName,
        email: email,
        friends: [{ friendId, friendName }],
        profilePic,
      });
      res.status(200).json({
        success: true,
        message: `${friendName} added to your friend list.`,
        newUser,
      });
      return;
    } else {
      const isFriendExists = await Friend.findOne({
        email,
        "friends.friendId": friendId,
      });
      if (isFriendExists) {
        res.status(400).json({
          success: false,
          message: `${friendName} is already in you friend list.`,
        });
        return;
      }
      // If the user has an existing friend list, update it
      const updateUser = await Friend.findOneAndUpdate(
        { email }, // Find user by userName
        { $push: { friends: { friendId, friendName }, profilePic } }, // Push new friend into friends array
        { new: true } // Return the updated document
      );
      res.status(200).json({
        success: true,
        message: `${friendName} added to your friend list.`,
        updateUser,
      });
      return;
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const removeFriend: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { email } = req.user!;
    const { friendName } = req.body;

    const UserDetails = await Friend.findOne({ email });
    if (!UserDetails) {
      res.status(404).json({
        success: false,
        message: "No user's exits with provided credentials",
      });
    }

    const removeUserFriend = await Friend.findOneAndUpdate(
      { email },
      { $pull: { friends: { friendName } } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Friend removed from your friend list.",
      updatedFriendList: removeUserFriend?.friends,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
