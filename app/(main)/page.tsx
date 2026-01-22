import FeedSidebar from "@/components/feed/feed-sidebar";
import Feed from "@/components/feed/main-feed";
import { getSession } from "@/lib/next-auth-options";

export default async function Home() {
  const session = await getSession();
  console.log(session);

  return (
    <div className="flex">
      <Feed />
      <FeedSidebar />
    </div>
  );
}
