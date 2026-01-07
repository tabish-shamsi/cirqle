"use client";

import { useState } from "react";

export default function ToggleSidebarButton() {
  const [isPressed, setIsPressed] = useState(false);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("main-layout-sidebard");
    if (!sidebar) return;

    if (isPressed) {
      sidebar.classList.add("-left-full");
      sidebar.classList.remove("left-0");
    } else {
      sidebar.classList.add("left-0");
      sidebar.classList.remove("-left-full");
    }

    setIsPressed(!isPressed);
  };

  return (
    <button
      className="lg:hidden pr-8 group inline-flex w-12 h-12 text-primary text-center items-center justify-center rounded transition cursor-pointer"
      aria-pressed={isPressed}
      onClick={toggleSidebar}
    >
      <span className="sr-only">Menu</span>
      <svg
        className="w-7 h-7 fill-current pointer-events-none"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className="origin-center -translate-y-1.25 translate-x-1.75 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-pressed:translate-x-0 group-aria-pressed:translate-y-0 group-aria-pressed:rotate-315"
          y="7"
          width="9"
          height="2"
          rx="1"
        ></rect>
        <rect
          className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-pressed:rotate-45"
          y="7"
          width="16"
          height="2"
          rx="1"
        ></rect>
        <rect
          className="origin-center translate-y-1.25 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-pressed:translate-y-0 group-aria-pressed:-rotate-225"
          y="7"
          width="9"
          height="2"
          rx="1"
        ></rect>
      </svg>
    </button>
  );
}
