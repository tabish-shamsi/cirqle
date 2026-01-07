import { NAV_LINKS } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navlinks() {
  return NAV_LINKS.slice(0, 5).map((link, i) => (
    <div key={link.name} className="p-2 hidden xl:block">
      <Link
        key={link.path}
        href={link.path}
        className={cn(
          "text-sm font-medium h-12.5 w-12.5 rounded-full flex items-center justify-center bg-muted",
          i === 0 && "ml-8",
        )}
      >
        {<link.icon className="w- text-muted-foreground" />}
      </Link>
    </div>
  ));
}
