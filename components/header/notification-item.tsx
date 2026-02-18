"use client";
 
import { readNotification } from "@/actions/notification/notification.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { INotification } from "@/models/Notification";
import { getUserInitials } from "@/utils/getUserInitials";
import { format } from "date-fns";
import { toast } from "sonner";

type Props = {
  notification: INotification;
};

export default function NotificationItem({ notification }: Props) {
  const handleNotificationRead = async () => {
    const res = await readNotification(notification._id.toString());

    if (res?.error) {
      return toast.error(res.error);
    }
  };

  return (
    <div
      className="flex gap-3 rounded-lg p-3 hover:bg-muted/50 dark:hover:bg-slate-700 transition-colors"
      onClick={handleNotificationRead}
    >
      <Avatar className="h-10 w-10">
        <AvatarImage src={notification.sender?.avatar?.url} />
        <AvatarFallback>
          {getUserInitials(notification.sender?.name)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <p className="text-sm">
          <span className="font-medium">{notification.sender?.name}</span>{" "}
          {notification.message}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {format(notification.createdAt, "h:mm a")}
        </p>
      </div>

      {!notification.isRead && (
        <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
      )}
    </div>
  );
}
