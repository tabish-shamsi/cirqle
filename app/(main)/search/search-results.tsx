"use client";

import { useSearchParams } from "next/navigation";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <h3 className="font-semibold medium text-muted-foreground">
      Search Results for: <span className="text-primary">{q}</span>
    </h3>
  );
}
