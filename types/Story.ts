import TUser from "./User";
import IMedia from "./Media";
import IUser from "./User";
import mongoose from "mongoose";

interface IStory extends Document {
  _id: string;
  author: IUser;
  media: IMedia;
  readers: mongoose.Types.ObjectId[];

  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type Stories = {
  author: TUser;
  stories: IStory[];
};

export default IStory;
