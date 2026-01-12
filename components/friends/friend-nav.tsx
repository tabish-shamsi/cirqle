"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { FRIEND_TABS } from "@/lib/placeholder-data";
import { useActivePath } from "@/hooks/useActivePath";

export default function FriendNav() {
  const { isActive } = useActivePath();

  return (
    <div className="flex items-center gap-4">
      {FRIEND_TABS.map((tab) => (
        <Link key={tab.href} href={tab.href}>
          <Button
            variant={isActive(tab.href, false) ? "default" : "outline"}
            className="text-sm"
          >
            {tab.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
