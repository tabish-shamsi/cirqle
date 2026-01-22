import mongoose from "mongoose";
import TMedia from "./Media";

interface IProfile extends Document {
  _id: mongoose.Types.ObjectId;

  bio?: string;
  current_city?: string;
  hometown?: string;
  profession?: string;
  birthday?: Date;
  avatar?: TMedia;
  cover?: TMedia;

  socials?: {
    platform: string;
    url: string;
  }[];

  createdAt: Date;
  updatedAt: Date;
};

export default IProfile;
