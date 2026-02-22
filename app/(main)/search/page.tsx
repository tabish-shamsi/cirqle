import Tabs from "@/app/(main)/search/tab-buttons";
import SearchWrapper from "./search-wrapper";
import SearchResults from "./search-results";
import { Suspense } from "react";

export default function Search({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    posts: string;
    people: string;
    videos: string;
  }>;
}) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-3/4">
        <div className="space-y-4">
          <Suspense>
            <SearchResults />
          </Suspense>

          <Suspense>
            <Tabs />
          </Suspense>

          <div className="mt-12 space-y-8">
            <SearchWrapper searchParams={searchParams} />
          </div>
        </div>
      </div>
    </div>
  );
}
