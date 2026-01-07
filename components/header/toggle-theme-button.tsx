"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-12 h-12 text-primary cursor-pointer p-3 hidden lg:block"
    >
      {isDark ? <Sun /> : <Moon />}
    </button>
  );
}
