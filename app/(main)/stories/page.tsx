import SearchTitleHeader from "@/components/search-title-header";
import StoryCard from "@/components/stories/story-card";
import { stories } from "@/lib/temporary-mock-data";

export default function Stories() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-4/5 space-y-4">
        <SearchTitleHeader title="Stories" placeholder="Search User..." />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {stories.map((story) => (
            <div key={story.id} className="h-64">
              <StoryCard story={story} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
