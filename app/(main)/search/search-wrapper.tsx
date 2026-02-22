import { notFound } from "next/navigation";
import PostsWrapper from "./posts-wrapper";
import VideosWrapper from "./videos-wrapper";
import UsersWrapper from "./users-wrapper";
import { Suspense } from "react";
import { PostSkeleton } from "@/components/posts/post-skeleton";
import { FriendCardSkeleton } from "@/components/skeletons/friend-card-skeleton";

export default async function SearchWrapper({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    posts: string;
    people: string;
    videos: string;
  }>;
}) {
  const { q, posts, people, videos } = await searchParams;

  if (q && posts && people && videos) return notFound();

  if (posts) {
    return (
      <Suspense fallback={<PostSkeleton />}>
        <PostsWrapper q={q} />
      </Suspense>
    );
  } else if (videos) {
    return (
      <Suspense fallback={<PostSkeleton />}>
        <VideosWrapper q={q} />
      </Suspense>
    );
  } else if (people) {
    return (
      <Suspense fallback={<FriendCardSkeleton />}>
        <UsersWrapper q={q} />
      </Suspense>
    );
  }
}
