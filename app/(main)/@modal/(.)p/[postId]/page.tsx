import PostDialog from "@/components/posts/PostDialog";
import { posts } from "@/lib/temporary-mock-data";

export default async function page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = posts.filter((post) => post.id === postId)[0];
  return <PostDialog post={post} />;
}
