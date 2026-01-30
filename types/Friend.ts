import mongoose from "mongoose";
import TUser from "./User";

export type FriendStatus = "pending" | "accepted"
export type FriendType = "acceptor" | "requestor" | "notFriend"

interface IFriend extends Document {
  _id: mongoose.Types.ObjectId;
  requestor: TUser;
  acceptor: TUser;
  status: FriendStatus;
  createdAt: Date;
  updatedAt: Date;
};

export default IFriend;
