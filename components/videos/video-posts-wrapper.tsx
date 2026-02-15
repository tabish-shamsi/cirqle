import getPosts from "@/data/post";
import PostList from "../feed/posts-list";
import { nanoid } from "nanoid";

export default async function VideoPostsWrapper({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const posts = await getPosts({ postType: "video", query });
  const id = nanoid();

  return <PostList initialPosts={posts} key={id} postType="video" />;
}
