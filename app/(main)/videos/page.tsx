import PostList from "@/components/posts/post-list";
import SearchTitleHeader from "@/components/search-title-header";

import { posts } from "@/lib/temporary-mock-data";

export default async function Videos() {
  const videoPosts = await posts.filter((post) =>
    post.media.some((media) => media.type === "video")
  );
  console.log(videoPosts);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-4/5 space-y-4">
        <SearchTitleHeader title="Videos" placeholder="Search Videos..." />
        <PostList posts={videoPosts} />
      </div>
    </div>
  );
}
