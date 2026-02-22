"use client";

import { readNotification } from "@/actions/notification/notification.action";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { INotification } from "@/models/Notification";
import { getUserInitials } from "@/utils/getUserInitials";
import { format } from "date-fns";
import { toast } from "sonner"; 
import { Dispatch, SetStateAction } from "react";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  notification: INotification;
  setNotifications: Dispatch<SetStateAction<INotification[]>>;
};
export const notificationType = {
  FRIEND_REQUEST: "FRIEND_REQUEST",
  ACCEPTED_FRIEND_REQUEST: "ACCEPTED_FRIEND_REQUEST",
  DECLINED_FRIEND_REQUEST: "DECLINED_FRIEND_REQUEST",
};

export default function NotificationItem({
  notification,
  setNotifications,
}: Props) {
  const router = useRouter();

  const handleNotificationRead = async () => {
    const res = await readNotification(notification._id.toString());
    setNotifications((prev) => {
      return prev.map((n) => {
        if (n._id === notification._id) {
          return { ...n, isRead: true } as INotification;
        } else {
          return n;
        }
      });
    });

    if (
      notification.type === notificationType.ACCEPTED_FRIEND_REQUEST ||
      notification.type === notificationType.DECLINED_FRIEND_REQUEST ||
      notification.type === notificationType.FRIEND_REQUEST
    ) {
      router.push(`/u/${notification.sender.username}`);
    } else {
      router.push(`/p/${notification.postId}`);
    }

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

      <Button variant="ghost" size="icon-sm">
        <Trash className="w-8 text-primary" />
      </Button>
    </div>
  );
}
