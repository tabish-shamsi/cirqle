"use client";

import { useActivePath } from "@/hooks/useActivePath";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type TLink = {
  name: string;
  path: string;
  icon: any;
};

export default function SidebardLink({ name, path, icon }: TLink) {
  const { isActive } = useActivePath();

  return (
    <Link
      href={path}
      className={cn(
        "flex items-center hover:bg-gray-100 dark:hover:bg-muted font-semibold text-muted-foreground hover:text-primary p-3 rounded-lg",
        isActive(path) && "bg-gray-100 dark:bg-muted text-primary"
      )}
    >
      {icon}
      <span>{name}</span>
    </Link>
  );
}
