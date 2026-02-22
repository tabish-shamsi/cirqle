import FeedSidebar from "@/components/feed/feed-sidebar";
import Feed from "@/components/feed/main-feed";

export default async function Home() { 
  return (
    <div className="flex">
      <Feed />
      <FeedSidebar />
    </div>
  );
}
