"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { user } from "@/lib/temporary-mock-data";

export default function CreateStoryCard() {
  return (
    <div className="relative w-full h-50 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition">
      {/* Background */}
      <div className="absolute inset-0 bg-card " />

      {/* Top Image Placeholder */}
      <div className="relative h-35 w-full bg-gray-200">
        <Image
          src={user.avatar}
          alt="create story"
          fill
          className="object-cover"
        />
      </div>

      {/* Plus Button */}
      <div className="absolute top-28.75 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-white">
        <Plus className="text-white w-5 h-5" />
      </div>

      {/* Label */}
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <span className="text-sm font-semibold">Create Story</span>
      </div>
    </div>
  );
}
