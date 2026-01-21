import mongoose from "mongoose";
import TProfile from "./TProfile";

type TUser = {
  _id: mongoose.Types.ObjectId;

  profileId?: mongoose.Types.ObjectId;
  profile?: TProfile;

  posts?: mongoose.Types.ObjectId[];
  stories?: mongoose.Types.ObjectId[];
  friends?: mongoose.Types.ObjectId[];

  name: string;
  username: string;
  email: string;
  birthday: Date;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export default TUser;
