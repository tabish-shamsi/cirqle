import { getPostById } from "@/data/post";
import EditPostCard from "./edit-post";

export default async function EditPostWrapper({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPostById(postId);
  
  return <EditPostCard post={post} />;
}
