"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsCardHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 pb-8 pt-0">
      <button
        onClick={() => router.back()}
        className="rounded-md p-2 hover:bg-muted"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <h1 className="text-lg md:text-xl font-semibold">{title}</h1>
    </div>
  );
}
