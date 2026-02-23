import checkAuth from "@/data/check-auth";
import { getPostById } from "@/data/post";
import { notFound } from "next/navigation";
import SinglePostCard from "./single-post-card";

export default async function PostDiaglogWrapper({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  await checkAuth();
  const { postId } = await params;

  const post = await getPostById(postId);

  if (!post) return notFound();

  return <SinglePostCard post={post} />;
}
