import mongoose, { Document, ObjectId, Schema } from "mongoose";

interface IFriends extends Document {
  user: string;
  email: string;
  friends: Array<{
    friendEmail: string;
    friendId: ObjectId;
    friendName: string;
    profilePic: string;
  }>;
  activeRequests: Array<{
    userId: ObjectId; // Changed from name to userId
    name: string;
    profilePic: string;
    friendEmail: string;
    accepted: boolean;
  }>;
}

const friendSchema: Schema<IFriends> = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email: string) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation
        },
        message: "Invalid email format",
      },
    },
    friends: [
      {
        friendId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        friendName: {
          type: String,
        },
        friendEmail: {
          type: String,
        },
        profilePic: {
          type: String,
        },
      },
    ],
    activeRequests: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
        },
        profilePic: {
          type: String,
        },
        friendEmail: {
          type: String,
        },
        accepted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

friendSchema.index({ email: 1 }); // Add index for faster queries

export default mongoose.model<IFriends>("Friend", friendSchema);
