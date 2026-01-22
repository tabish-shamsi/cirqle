import mongoose from "mongoose";
import TUser from "./User";

interface IComment {
  _id: mongoose.Types.ObjectId;

  authorId: mongoose.Types.ObjectId;
  author?: TUser;

  postId: mongoose.Types.ObjectId;
  parentId: mongoose.Types.ObjectId;

  comment: string;

  createdAt: Date;
  updatedAt: Date;
}

export default IComment;
