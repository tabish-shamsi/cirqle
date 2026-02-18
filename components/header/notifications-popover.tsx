import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bell } from "lucide-react";
import Link from "next/link";
import { getRecentNotifications } from "@/data/notifications";
import { Suspense } from "react";
import { INotification } from "@/models/Notification";
import NotificationItem from "./notification-item";
import NotificationDot from "./notification-dot";

export default function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative md:ml-auto">
          <button className="text-primary cursor-pointer p-3">
            <Bell className="w-5 lg:w-7" />
          </button>

          {/* Notification dot */}
          <NotificationDot />
        </div>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-96 p-2 z-999">
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

  if (notifications.length > 0) {
    return (
      <div className="max-h-80 overflow-y-auto pt-2">
        {notifications.map((notification: INotification) => (
          <NotificationItem
            key={notification._id.toString()}
            notification={notification}
          />
        ))}
      </div>
    );
  } else {
    return (
      <p className="text-sm text-muted-foreground p-4">No notifications</p>
    );
  }
}
