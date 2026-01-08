import { PostCard } from "./post-card";
import { PostSkeleton } from "./post-skeleton";

export default function PostList({ posts }: { posts: any }) {
  return (
    <>
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}

      <PostSkeleton />
    </>
  );
}
