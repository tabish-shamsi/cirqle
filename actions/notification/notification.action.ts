"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Notification from "@/models/Notification";

export async function readNotification(notificationId: string) {
  try {
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

    // redirect()
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while updating notification" };
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
