import PostList from "@/components/feed/posts-list";
import getPosts from "@/data/post";
import { nanoid } from "nanoid";

export default async function PostsWrapper({ q }: { q: string }) {
  const posts = await getPosts({ query: q });
  const id = nanoid();

  return <PostList initialPosts={posts} q={q} key={id} />;
}
