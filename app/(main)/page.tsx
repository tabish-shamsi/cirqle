import FeedSidebar from "@/components/feed/feed-sidebar";
import Feed from "@/components/feed/main-feed";

export default function Home() {
  return (
    <div className="flex">
      <Feed />
      <FeedSidebar />
    </div>
  );
}
