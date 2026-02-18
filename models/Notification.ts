import IUser from "@/types/User";
import { Document, model, models, Schema, Types } from "mongoose";

export type NotificationType =
  | "POST"
  | "COMMENT"
  | "LIKE"
  | "FRIEND_REQUEST"
  | "ACCEPTED_FRIEND_REQUEST"
  | "DECLINED_FRIEND_REQUEST"
  | "AVATAR_UPDATE"
  | "COVER_UPDATE";

export interface INotification extends Document {
  _id: Types.ObjectId;
  reciever: Types.ObjectId; // User's Id who is getting the notification
  sender: IUser; // User's Id who is sending the notification
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: Date;
}

export const NotificationMessages = {
  posted: "posted",
  postLike: "liked your post",
  postComment: "commented on you post",
  sendRequest: "sent you a friend request",
  declineRequest: "declined your friend request",
  acceptRequest: "accepted your friend request",
  avatarUpdate: "updated their avatar image",
  coverUpdate: "updated their cover image",
};

const notificationSchema = new Schema<INotification>(
  {
    reciever: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const Notification =
  models.Notification ||
  model<INotification>("Notification", notificationSchema);

export default Notification;
