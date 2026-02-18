"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Notification from "@/models/Notification";
import { redirect } from "next/navigation";

export default async function readNotification(notificationId: string) {
  try {
    const { id } = await checkAuth();
    await db();

    const notification = await Notification.findOneAndUpdate({
      reciever: id,
      _id: notificationId,
    }, {isRead: true});

    if(!notification) {
        return {error: "Unexpected Error: Notification Not Found"}
    }

    // redirect()
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while updating notification" };
  }
}
