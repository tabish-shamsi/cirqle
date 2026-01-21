import mongoose from "mongoose";

type TProfile = {
  _id: mongoose.Types.ObjectId;

  bio?: string;
  current_city?: string;
  hometown?: string;
  profession?: string;
  birthday?: Date;

  socials?: {
    platform: string;
    url: string;
  }[];

  createdAt: Date;
  updatedAt: Date;
};

export default TProfile;
