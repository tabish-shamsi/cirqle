import checkAuth from "@/data/check-auth";
import { getPostById } from "@/data/post";
import { notFound } from "next/navigation";
import SinglePostCard from "./single-post-card";

export default async function SinglePost({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  await checkAuth();
  const { postId } = await params;
  const post = await getPostById(postId);
  if (!post) return notFound();

  return (
    <div className="flex items-center justify-center mb-4">
      <div className="w-full md:w-3/4">
        <SinglePostCard post={post} />
      </div>
    </div>
  );
}
