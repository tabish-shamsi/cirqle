import getPosts from "@/data/post";
import PostList from "./posts-list";
import { nanoid } from "nanoid";

export default async function HomePosts() {
  const posts = await getPosts();
  const id = nanoid();

  return <PostList key={id} initialPosts={posts}  />;
}
