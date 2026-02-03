import checkAuth from "@/data/check-auth";
import { getPostById } from "@/data/post";
import { notFound } from "next/navigation";
import PostDialog from "./PostDialog";

export default async function PostDiaglogWrapper({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  await checkAuth();
  const { postId } = await params;

  const post = await getPostById(postId);

  if (!post) return notFound();

  return <PostDialog post={post} />;
}
