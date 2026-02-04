import getPosts from "@/data/post";
import PostList from "../feed/posts-list";

export default async function ProfilePosts({ userId }: { userId: string }) {
  const posts = await getPosts(0, userId);

  return <PostList initialPosts={posts} userId={userId} />;
}
