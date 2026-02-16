import db from "@/lib/db";
import checkAuth from "./check-auth";
import Notification from "@/models/Notification";
import toJSON from "@/utils/toJSON";

export async function getRecentNotifications() {
  const { id } = await checkAuth();
  await db();

  const notifications = await Notification.find({ reciever: id })
    .populate({
      path: "sender",
      select: "name username avatar",
      populate: { path: "avatar", select: "url" },
    })
    .limit(5)
    .sort({ createdAt: -1 });

  return toJSON(notifications);
}
