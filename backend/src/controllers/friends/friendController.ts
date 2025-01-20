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
    const { friendId, friendName, friendEmail, profilePic } = req.body;

    if (!friendId || !friendName) {
      res.status(400).json({
        success: false,
        message: "No friend details found",
      });
      return;
    }
    if (email === friendEmail) {
      res.status(400).json({
        sucess: false,
        message: "You can add yourself in your friend list.",
      });
    }

    const isExistingUser = await Friend.findOne({ email });

    if (!isExistingUser) {
      const newUser = await Friend.create({
        user: userName,
        email: email,
        friends: [{ friendId, friendName, friendEmail, profilePic }],
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
      const updateUser = await Friend.findOneAndUpdate(
        { email },
        {
          $push: { friends: { friendId, friendName, friendEmail, profilePic } },
        },
        { new: true }
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
    const { friendEmail } = req.body;

    const UserDetails = await Friend.findOne({ email });
    if (!UserDetails) {
      res.status(404).json({
        success: false,
        message: "No user's exits with provided credentials",
      });
      return;
    }

    const removeUserFriend = await Friend.findOneAndUpdate(
      { email },
      { $pull: { friends: { friendEmail } } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Friend removed from your friend list.",
      updatedFriendList: removeUserFriend?.friends,
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

export const suggestedFriends: RequestHandler = async (
  req: AuthenticatedRequest,
  res
) => {
  try {
    const { email } = req.user!;
    if (!email) {
      res.status(400).json({
        success: false,
        message: "Please login again",
      });
      return;
    }

    const userDetails = await Friend.findOne({ email });
    if (!userDetails) {
      res.status(404).json({
        success: false,
        message: "No user exists with provided credentials",
      });
      return;
    }

    const userFriendsEmails = userDetails.friends.map(
      (friend) => friend.friendEmail
    );

    const friendsOfFriends = await Friend.find({
      email: { $in: userFriendsEmails },
    });

    const addedEmails = new Set<string>();
    const suggestedFriendsList: {
      friendEmail: string;
      friendName: string;
      profilePic: string;
    }[] = [];

    friendsOfFriends.forEach((friend) => {
      friend.friends.forEach((fof) => {
        if (
          fof.friendEmail !== email &&
          !userFriendsEmails.includes(fof.friendEmail) &&
          !addedEmails.has(fof.friendEmail)
        ) {
          addedEmails.add(fof.friendEmail);
          suggestedFriendsList.push(fof);
        }
      });
    });

    res.status(200).json({
      success: true,
      suggestedFriends: suggestedFriendsList,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
