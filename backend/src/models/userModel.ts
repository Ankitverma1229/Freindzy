import mongoose, { Document, ObjectId, Schema } from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends Document {
  _id: ObjectId;
  userName: string;
  email: string;
  password: string;
  profilePic: string;
  token: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error: any) {
    next(error);
  }
});

export default mongoose.model<IUser>("User", userSchema);
export type { IUser };
