import mongoose from "mongoose";
import TUser from "./User";

interface IFriend extends Document {
  _id: mongoose.Types.ObjectId;
  
  requestorId: mongoose.Types.ObjectId;
  requestor?: TUser;

  acceptorId: mongoose.Types.ObjectId;
  acceptor?: TUser;

  status: "pending" | "accepted" | "rejected" | "blocked";

  createdAt: Date;
  updatedAt: Date;
};

export default IFriend;
