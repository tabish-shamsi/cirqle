import TUser from "./TUser";
import mongoose from "mongoose";

type TPost = {
  _id: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  author?: TUser;
  content: string;
  media: [];
  feeling?: string;
  createdAt: Date;
  updatedAt: Date;
};

export default TPost;
