"use client";

import { checkUnreadNotifications } from "@/actions/notification/notification.action";
import { useEffect, useState } from "react";

export default function NotificationDot() {
  const [hasUnread, setHasUnread] = useState(false);

  const check = async () => {
    const unread = await checkUnreadNotifications();
    console.log(unread);

    if (unread > 0) setHasUnread(true);
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    check();
    // }, 5000); // check every 5 seconds

    // return () => clearInterval(interval);
  }, []);

  if (!hasUnread) {
    return;
  }

  return (
    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
  );
}
