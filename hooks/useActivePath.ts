"use client";

import { usePathname } from "next/navigation";

export function useActivePath() {
  const pathname = usePathname();

  const isActive = (currentPath: string, subpages: boolean = true) => {
    if (!subpages) {
      return pathname === currentPath;
    }

    // Normalize path
    const normalizedPath =
      currentPath === "/" ? "/" : `/${currentPath.replace(/^\/+/, "")}`;
    // Root path must match exactly
    if (normalizedPath === "/") {
      return pathname === "/";
    }

    // Match exact or sub-routes
    return (
      pathname === normalizedPath || pathname.startsWith(`${normalizedPath}/`)
    );
  };
  return { isActive };
}
