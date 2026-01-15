import PostList from "@/components/posts/post-list";
import PeopleGrid from "@/components/search/people-grid";
import Tabs from "@/components/search/tab-buttons";
import { friends, posts as POSTS } from "@/lib/temporary-mock-data";

export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    posts: string;
    people: string;
    videos: string;
  }>;
}) {
  const { q, posts, people, videos } = await searchParams;

  const filteredPosts = POSTS.filter((post) =>
    post.content.toLowerCase().includes(q.toLowerCase())
  );

  const filteredVideos = POSTS.filter((post) =>
    post.content.toLowerCase().includes(q.toLowerCase())
  );

  const filteredPeople = friends.friends.filter((friend) => {
    if (
      friend.name.toLowerCase().includes(q.toLowerCase()) ||
      friend.username.toLowerCase().includes(q.toLowerCase())
    ) {
      return friend;
    }
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full md:w-3/4">
        <div className="space-y-4">
          <h3 className="font-semibold medium text-muted-foreground">
            Search Results for: <span className="text-primary">{q}</span>
          </h3>

          <Tabs />
          <div className="mt-12">
            {posts === "1" && <PostList posts={filteredPosts} />}
            {videos === "1" && <PostList posts={filteredVideos} />}
            {people === "1" && <PeopleGrid people={filteredPeople} />}
          </div>
        </div>
      </div>
    </div>
  );
}
