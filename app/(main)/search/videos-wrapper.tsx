import PostList from "@/components/feed/posts-list";
import getPosts from "@/data/post";
import { nanoid } from "nanoid";

export default async function VideosWrapper({ q }: { q: string }) {
  const posts = await getPosts({ postType: "video", query: q });
  const id = nanoid();

  return <PostList initialPosts={posts} postType="video" q={q} key={id} />;
}
