import getPosts from "@/data/post";
import { PostCard } from "../posts/post-card";

export default async function HomePosts() {
  const posts = await getPosts();

  if (posts.length > 0) {
    return posts.map((post) => (
      <PostCard key={post._id.toString()} post={post} />
    ));
  } 
}
