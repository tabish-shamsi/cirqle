import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell } from "lucide-react";
import Link from "next/link";
import { notifications } from "@/lib/temporary-mock-data";
import { getRecentNotifications } from "@/data/notifications";
import { INotification } from "@/models/Notification";
import { getUserInitials } from "@/utils/getUserInitials";
import { Suspense } from "react";
import { format } from "date-fns";

export default function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative md:ml-auto">
          <button className="text-primary cursor-pointer p-3">
            <Bell className="w-5 lg:w-7" />
          </button>

          {/* Notification dot */}
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </div>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-80 p-0 z-999">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="text-sm font-semibold">Notifications</h4>
          <Link
            href="/notifications"
            className="text-xs text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        <Suspense fallback={<p>Loadding...</p>}>
          <NotificationList />
        </Suspense>
        {/* Notifications list */}
      </PopoverContent>
    </Popover>
  );
}

async function NotificationList() {
  const notifications = await getRecentNotifications();
  // const notifications = []
  console.log(notifications);

  if (notifications.length > 0) {
    return (
      <div className="max-h-80 overflow-y-auto">
        {notifications.map((notification: INotification) => (
          <div
            key={notification._id.toString()}
            className="flex gap-3 rounded-lg p-3 hover:bg-muted/50"
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
                {/* {notification.message} */}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {/* {format(notification.createdAt, "h:mm a")} */}
              </p>
            </div>

            {!notification.isRead && (
              <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <p className="text-sm text-muted-foreground p-4">No notifications</p>
    );
  }
}
