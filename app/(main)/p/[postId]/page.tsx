import { PostCard } from "@/components/posts/post-card";
import { posts } from "@/lib/temporary-mock-data";

export default async function page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = posts.filter((post) => post.id === postId)[0];
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="w-full md:w-3/4">
        <PostCard post={post} />
      </div>
    </div>
  );
}
