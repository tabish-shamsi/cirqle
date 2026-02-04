import CreatePost from "../posts/create-post";
import Stories from "../stories/stories";
import HomePosts from "./posts";
import { Suspense } from "react";
import { PostSkeleton } from "../posts/post-skeleton";

export default function Feed() {
  return (
    <div className="w-full lg:w-2/3 space-y-4 lg:pr-4 mb-4">
      <Stories />
      <CreatePost />
      <Suspense fallback={<PostSkeleton />}>
        <HomePosts />
      </Suspense>
    </div>
  );
}
