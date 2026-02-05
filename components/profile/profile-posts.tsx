import getPosts from "@/data/post";
import PostList from "../feed/posts-list";
import { nanoid } from "nanoid";

export default async function ProfilePosts({ userId }: { userId: string }) {
  const posts = await getPosts(0, userId);
  const id = nanoid();

  return <PostList key={id} initialPosts={posts} userId={userId} />;
}
