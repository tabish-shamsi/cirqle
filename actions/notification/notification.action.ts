"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Notification, {
  NotificationMessages,
  NotificationType,
} from "@/models/Notification";
import User from "@/models/User";
import mongoose from "mongoose";

export async function readNotification(notificationId: string) {
  const { id } = await checkAuth();
  await db();

  const notification = await Notification.findOneAndUpdate(
    {
      reciever: id,
      _id: notificationId,
    },
    { isRead: true },
  );

  if (!notification) {
    return { error: "Unexpected Error: Notification Not Found" };
  }
}

export async function cancelRequestNotification(recieverId: string) {
  try {
    const { id } = await checkAuth();
    await db();

    await Notification.findOneAndDelete({
      sender: id,
      reciever: recieverId,
      type: "FRIEND_REQUEST",
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while deleting notification" };
  }
}

export async function checkUnreadNotifications() {
  const { id } = await checkAuth();
  await db();

  const unreadCount = await Notification.countDocuments({
    reciever: id,
    isRead: false,
  });

  return unreadCount;
}

export async function createPostNotifications({
  postId,
  content,
}: {
  postId: string;
  content: string;
}) {
  try {
    const { id } = await checkAuth();
    await db();

    const user = await User.findById(id).select("friends");
    if (!user) {
      return { error: "Unexpected Error: User not found" };
    }

    if (user.friends?.length > 0) {
      await Promise.all(
        user.friends.map(async (friendId: mongoose.Types.ObjectId) => {
          await Notification.create({
            sender: id,
            reciever: friendId,
            type: "POST",
            postId: postId,
            message: `${NotificationMessages.posted} "${content}"`,
          });

          return { success: true };
        }),
      );
    } else {
      return;
    }
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Error" };
  }
}

export async function createNotificationAction({
  type,
  sender,
  reciever,
  message,
  postId,
}: {
  type: NotificationType;
  sender: string;
  reciever: string;
  message: string;
  postId?: string;
}) {
  try {
    await Notification.findOneAndDelete({ sender, reciever, type, postId });

    await Notification.create({ sender, reciever, type, message, postId });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while sending notificaiton" };
  }
}

// export async function deleteNotification({}){

// }