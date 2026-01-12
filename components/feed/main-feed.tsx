import { posts } from "@/lib/temporary-mock-data";
import CreatePost from "../posts/create-post";
import FriendSuggestionsSlider from "./friend-suggestions-slider";
import PostList from "../posts/post-list";
import Stories from "../stories/stories";

export default function Feed() {
  return (
    <div className="w-full lg:w-2/3 space-y-4 lg:pr-4 mb-4">
      <Stories />
      <CreatePost />
      <PostList posts={posts} />
    </div>
  );
}
