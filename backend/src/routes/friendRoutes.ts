import express from "express";
import {
  addNewFriend,
  getAllFriends,
  removeFriend,
} from "../controllers/friends/friendController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  acceptFriendRequest,
  createFriendRequest,
} from "../controllers/requests/friendRequestController.js";

const friendRouter = express.Router();

friendRouter.get("/all-friend", authenticate, getAllFriends);
friendRouter.post("/new-friend", authenticate, addNewFriend);
friendRouter.delete("/remove-friend", authenticate, removeFriend);
friendRouter.post("/send-request", authenticate, createFriendRequest);
friendRouter.post("/accept-request", authenticate, acceptFriendRequest);

export default friendRouter;
