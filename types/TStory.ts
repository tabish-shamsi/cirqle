import mongoose from "mongoose";
import TUser from "./TUser";

type TStory = {
  _id: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  author?: TUser;

  media: string;

  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export default TStory;
