import mongoose from "mongoose";
import TUser from "./User";

interface ILike extends Document {
  _id: mongoose.Types.ObjectId;

  userId: mongoose.Types.ObjectId;
  user?: TUser;

  postId: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

export default ILike;
