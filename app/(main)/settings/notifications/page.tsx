import SettingsCardHeader from "@/components/settings/settings-card-header";
import SimpleTooltip from "@/components/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Notification, notifications2 } from "@/lib/temporary-mock-data";
import groupNotifications from "@/utils/groupNotifications";
import { format, isToday, isYesterday } from "date-fns";
import { CheckCheck, ChevronLeft, Trash } from "lucide-react";

export default function NotificationsPage() {
  const grouped = groupNotifications(notifications2);
  const unreadCount = notifications2.filter((n) => n.unread).length;

  return (
    <Card>
      <CardContent className="relative">
        <SettingsCardHeader title="Notifications" />

        <div className="absolute right-4 top-0">
          <div className="flex items-center gap-2">
            <SimpleTooltip
              trigger={
                <Button variant="secondary" size="icon">
                  <Trash className="h-5 w-5 text-muted-foreground" />
                </Button>
              }
              content="Clear all notifications"
            />
            <SimpleTooltip
              trigger={
                <Button variant="secondary" size="icon">
                  <CheckCheck className="h-5 w-5 text-muted-foreground" />
                </Button>
              }
              content="Mark all as read"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-8">
          {Object.entries(grouped).map(([group, items]) => (
            <div key={group}>
              <h3 className="mb-4 text-sm font-medium text-muted-foreground">
                {group}
              </h3>

              <div className="space-y-4">
                {items.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex gap-3 rounded-lg p-3 hover:bg-muted/50"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={notification.user.avatar} />
                      <AvatarFallback>
                        {notification.user.name[0]}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">
                          {notification.user.name}
                        </span>{" "}
                        {notification.message}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {format(notification.createdAt, "h:mm a")}
                      </p>
                    </div>

                    {notification.unread && (
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
