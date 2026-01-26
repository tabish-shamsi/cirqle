import mongoose from "mongoose";
import IMedia from "./Media";

export interface ISocial {
  platform: string;
  url: string;
}

interface IProfile extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;

  bio?: string;
  current_city?: string;
  hometown?: string;
  profession?: string;
  cover?: IMedia;

  socials: ISocial[]

  createdAt: Date;
  updatedAt: Date;
};

export default IProfile;
