import { Notification } from "@/lib/temporary-mock-data";
import { format, isToday, isYesterday } from "date-fns";

export default function groupNotifications(notifications: Notification[]) {
  const groups: Record<string, Notification[]> = {};

  notifications.forEach((notification) => {
    let key = "";

    if (isToday(notification.createdAt)) {
      key = "Today";
    } else if (isYesterday(notification.createdAt)) {
      key = "Yesterday";
    } else {
      key = format(notification.createdAt, "MMMM d, yyyy");
    }

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(notification);
  });

  return groups;
}
