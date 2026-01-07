"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SearchMobile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="ml-auto md:hidden">
        <button
          onClick={() => setOpen(true)}
          className="text-primary cursor-pointer p-3"
        >
          <Search className="w-5 lg:w-7" />
        </button>
      </div>

      <div
        className={cn(
          "absolute left-0 h-full w-full bg-card z-2 flex justify-between items-center transition-all",
          open ? "translate-y-0" : "-translate-y-16 lg:-translate-y-24",
        )}
      >
        <input
          type="text"
          className="w-full h-full py-2 px-8"
          placeholder="Search..."
        />
        <button onClick={() => setOpen(false)} className="p-4 cursor-pointer">
          <X className="" />
        </button>
      </div>
    </>
  );
}
