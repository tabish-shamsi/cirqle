import mongoose from "mongoose";
import TUser from "./TUser";

type TComment = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  user?: TUser;

  postId: mongoose.Types.ObjectId;
  parentId: mongoose.Types.ObjectId;

  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export default TComment;
