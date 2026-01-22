import mongoose from "mongoose";
import TUser from "./User";

interface IMedia extends Document {
  _id: mongoose.Types.ObjectId;
  
  authorId: mongoose.Types.ObjectId;
  author?: TUser;

  postId?: mongoose.Types.ObjectId;
  storyId?: mongoose.Types.ObjectId;

  url: string;
  type: "image" | "video" | "story";
  imagekitId?: string;

  createdAt: Date;
  updatedAt: Date;
};

export default IMedia;
