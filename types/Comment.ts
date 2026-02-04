import mongoose from "mongoose";
import TUser from "./User";

interface IComment {
  _id: mongoose.Types.ObjectId;

  author: TUser;
  postId: mongoose.Types.ObjectId;
  parentId?: mongoose.Types.ObjectId;

  comment: string;
  repliesCount: number;
  replies: any[];

  createdAt: Date;
  updatedAt: Date;
}

export default IComment;
