import mongoose from "mongoose";
import TUser from "./User";

interface IStory extends Document {
  _id: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  author?: TUser;

  media: mongoose.Types.ObjectId;

  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export default IStory;
