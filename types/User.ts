import mongoose from "mongoose";
import TProfile from "./Profile";
import IMedia from "./Media";

interface IUser extends Document {
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
  isVerified: boolean;
  avatar?: IMedia;

  otpResendCount: number;
  lastOtpSentAt: Date;

  createdAt: Date;
  updatedAt: Date;
}

export default IUser;
