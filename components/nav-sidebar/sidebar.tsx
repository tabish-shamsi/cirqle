import { ACCOUNT_PAGES, MORE_PAGES, NAV_LINKS } from "@/lib/placeholder-data";
import { Card } from "../ui/card";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";

export default function Sidebar() {
  return (
    <aside id="main-layout-sidebard" className="bg-card lg:bg-background fixed top-0 -left-full lg:left-0 mt-16 lg:mt-24 -z-1 transition-all">
      <ScrollArea className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-6rem)] p-4 pr-4 w-70">
        <Card className="gap-2 p-4 mb-4 shadow-none border-none lg:border lg:shadow-sm">
          <h4 className="font-medium text-sm text-muted-foreground">
            New Feeds
          </h4>
          {NAV_LINKS.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className="flex items-center hover:bg-gray-100 font-semibold text-muted-foreground hover:text-primary p-3 rounded-lg"
            >
              <link.icon className="h-6 w-6 mr-3 text-primary " />
              <span>{link.name}</span>
            </Link>
          ))}
        </Card>

        <Card className="gap-2 p-4 mb-4 shadow-none border-none lg:border lg:shadow-sm">
          <h4 className="font-medium text-sm text-muted-foreground">More Pages</h4>
          {MORE_PAGES.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className="flex items-center hover:bg-gray-100 font-semibold text-muted-foreground hover:text-primary p-3 rounded-lg"
            >
              <link.icon className="h-6 w-6 mr-3 text-primary " />
              <span>{link.name}</span>
            </Link>
          ))}
        </Card>

        <Card className="gap-2 p-4 shadow-none border-none lg:border lg:shadow-sm">
          <h4 className="font-medium text-sm text-muted-foreground">Account</h4>
          {ACCOUNT_PAGES.map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className="flex items-center hover:bg-gray-100 font-semibold text-muted-foreground hover:text-primary p-3 rounded-lg"
            >
              <link.icon className="h-6 w-6 mr-3 text-primary " />
              <span>{link.name}</span>
            </Link>
          ))}
        </Card>
      </ScrollArea>
    </aside>
  );
}
