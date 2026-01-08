import { posts } from "@/lib/temporary-mock-data";
import PostList from "../posts/post-list";
import CreatePost from "../posts/create-post";
import FriendSuggestionsSlider from "./friend-suggestions-slider";

export default function Feed() {
  return (
    <div className="w-full lg:w-2/3 space-y-4 lg:pr-4 mb-4">
      <CreatePost />
      <FriendSuggestionsSlider />
      <PostList posts={posts} />
    </div>
  );
}
