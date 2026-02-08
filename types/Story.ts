import { User } from "next-auth";
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

export type StoryItem = {
  _id: string;
  author: {
    name: string;
    username: string;
    avatar?: string;
    _id: string;
  };
  hasUnread: boolean;
  story: IStory;
};

export default IStory;
