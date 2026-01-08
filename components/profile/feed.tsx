import { posts, user } from "@/lib/temporary-mock-data";
import CreatePost from "../posts/create-post";
import PostList from "../posts/post-list";

export default function Feed() {
  const userPosts = posts.map((post) => {
    return {...post, author: user}
  });

  
  return (
    <div className="space-y-4 w-full lg:w-2/3 lg:pl-4 pt-4">
      <CreatePost />
      <PostList posts={userPosts} />
    </div>
  );
}
