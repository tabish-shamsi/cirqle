import FeedSidebar from "@/components/feed/feed-sidebar";
import Feed from "@/components/feed/main-feed";
import StoryViewer from "@/components/stories/story-viewer";

export default async function Home({searchParams}: {searchParams: Promise<{storyId: string}>}) {
  const {storyId} = await searchParams
  console.log(storyId);
  
  
  return (
    <div className="flex">
      <Feed />
      <FeedSidebar />
      <StoryViewer storyId={storyId} />
    </div>
  );
}
