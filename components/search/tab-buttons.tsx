"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { SEARCH_TABS } from "@/lib/placeholder-data";

export default function Tabs() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const q = searchParams.get("q");
  const posts = searchParams.get("posts");
  const people = searchParams.get("people");
  const videos = searchParams.get("videos");

  const activeTab = posts
    ? "posts"
    : people
    ? "people"
    : videos
    ? "videos"
    : "posts";

  const handleTabChange = (tab: string) => {
    router.push(`/search?q=${q}&${tab}=1`);
  };

  return (
    <div className="flex items-center gap-4">
      {SEARCH_TABS.map((tab) => (
        <Button
          key={tab}
          variant={activeTab === tab ? "default" : "outline"}
          className="capitalize"
          onClick={() => handleTabChange(tab)}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
