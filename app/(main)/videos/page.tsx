import { PostSkeleton } from "@/components/posts/post-skeleton";
import SearchTitleHeader from "@/components/search-title-header";
import VideoPostsWrapper from "@/components/videos/video-posts-wrapper";
import { Suspense } from "react";

export default function Videos({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-4/5 space-y-4">
        <SearchTitleHeader title="Videos" placeholder="Search Videos..." />
        <Suspense fallback={<PostSkeleton />}>
          <VideoPostsWrapper searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
