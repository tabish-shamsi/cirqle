import FeedSidebar from "@/components/feed/feed-sidebar";
import Feed from "@/components/feed/main-feed";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ storyId: string }>;
}) {
  const { storyId } = await searchParams;
  console.log(storyId);

  return (
    <div className="flex">
      <Feed />
      <FeedSidebar />
    </div>
  );
}
