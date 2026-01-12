"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function FriendNav() {
  const tabs = [
    {
      label: "All Friends",
      href: "/friends",
    },
    {
      label: "Friend Requests",
      href: "/friends/requests",
    },
    {
      label: "Suggestions",
      href: "/friends/suggestions",
    },
  ];

  const pathname = usePathname();
  const isActiveTab = (href: string) => pathname === href;

  return (
    <div className="flex items-center gap-4">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href}>
          <Button
            variant={isActiveTab(tab.href) ? "default" : "outline"}
            className="text-sm"
          >
            {tab.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
