import IMedia from "./Media";
import TUser from "./User";
import mongoose from "mongoose";

interface IPost extends Document {
  _id: mongoose.Types.ObjectId;

  content: string;
  media: IMedia[];
  author: TUser;

  postType: "image" | "video";
  specialType: "avatar" | "cover";

  commentsCount?: number;
  likesCount?: number;
  isLiked?: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export default IPost;
