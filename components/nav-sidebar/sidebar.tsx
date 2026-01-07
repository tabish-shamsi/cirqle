import { ACCOUNT_PAGES, MORE_PAGES, NAV_LINKS } from "@/lib/placeholder-data";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import SidebardLink from "./sidebar-link";

export default function Sidebar() {
  return (
    <aside
      id="main-layout-sidebard"
      className="bg-card lg:bg-background fixed top-0 -left-full lg:left-0 mt-16 lg:mt-24 lg:-z-1 z-3 transition-all"
    >
      <ScrollArea className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-6rem)] p-4 pr-4 w-70">
        <Card className="gap-2 p-4 mb-4 shadow-none border-none lg:border lg:shadow-sm">
          <h4 className="font-medium text-sm text-muted-foreground">
            New Feeds
          </h4>
          {NAV_LINKS.map(({ name, path, icon: Icon }) => (
            <SidebardLink
              name={name}
              path={path}
              icon={<Icon className={sidebar_icon_classes} />}
              key={name}
            />
          ))}
        </Card>

        <Card className="gap-2 p-4 mb-4 shadow-none border-none lg:border lg:shadow-sm">
          <h4 className="font-medium text-sm text-muted-foreground">
            More Pages
          </h4>
          {MORE_PAGES.map(({ name, path, icon: Icon }) => (
            <SidebardLink
              name={name}
              path={path}
              icon={<Icon className={sidebar_icon_classes} />}
              key={name}
            />
          ))}
        </Card>

        <Card className="gap-2 p-4 shadow-none border-none lg:border lg:shadow-sm">
          <h4 className="font-medium text-sm text-muted-foreground">Account</h4>
          {ACCOUNT_PAGES.map(({ name, path, icon: Icon }) => (
            <SidebardLink
              name={name}
              path={path}
              icon={<Icon className={sidebar_icon_classes} />}
              key={name}
            />
          ))}
        </Card>
      </ScrollArea>
    </aside>
  );
}

var sidebar_icon_classes = "h-6 w-6 mr-3 text-primary";
