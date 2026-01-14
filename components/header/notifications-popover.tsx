import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Bell } from "lucide-react";
import Link from "next/link";
import { notifications } from "@/lib/temporary-mock-data";

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

        {/* Notifications list */}
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex gap-3 px-4 py-3 hover:bg-muted cursor-pointer"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={notification.avatar} />
                <AvatarFallback>{notification.name[0]}</AvatarFallback>
              </Avatar>

              <div className="text-sm leading-tight">
                <p className="font-medium">{notification.name}</p>
                <p className="text-muted-foreground">{notification.message}</p>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
