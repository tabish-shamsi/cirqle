"use client";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { INotification } from "@/models/Notification";
import NotificationItem from "./notification-item";
import {
  checkUnreadNotifications,
  getNotificationsAction,
} from "@/actions/notification/notification.action";

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const loadNotifications = async () => {
    setLoading(true);
    const data = await getNotificationsAction();

    setNotifications(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
    }
  }, [isOpen]);

  const check = async () => {
    const unread = await checkUnreadNotifications();

    if (unread > 0) setHasUnread(true);
  };

  useEffect(() => {
    check();
  }, [notifications]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="relative md:ml-auto">
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="text-primary cursor-pointer p-3"
          >
            <Bell className="w-5 lg:w-7" />
          </button>

          {/* Notification dot */}
          {hasUnread && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent align="end" sideOffset={8} className="w-96 p-2 z-999">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="text-sm font-semibold">Notifications</h4>
          <Link
            href="/settings/notifications"
            className="text-xs text-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {notifications.length > 0 ? (
          <div className="max-h-80 overflow-y-auto pt-2">
            {notifications.map((notification: INotification) => (
              <NotificationItem
                key={notification._id.toString()}
                notification={notification}
                setNotifications={setNotifications}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground p-4">No notifications</p>
        )}
      </PopoverContent>
    </Popover>
  );
}
