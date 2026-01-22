import TUser from "./User";
import mongoose from "mongoose";

interface IPost extends Document {
  _id: mongoose.Types.ObjectId;

  content: string;
  media: mongoose.Types.ObjectId[];
  feeling?: string;

  authorId: mongoose.Types.ObjectId;
  author?: TUser;

  comments?: mongoose.Types.ObjectId[];
  likes?: mongoose.Types.ObjectId[];

  commentsCount?: number;
  likesCount?: number;

  createdAt: Date;
  updatedAt: Date;
};

export default IPost;
