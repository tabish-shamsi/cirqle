import ViewUserStoryWrapper from "@/components/stories/view-story-wrapper";

export default async function StoriesPage({
  params,
}: {
  params: Promise<{ username: string; storyId: string }>;
}) {
  return (
    <div className="flex h-[calc(85vh)] w-full items-center justify-center relative">
      <ViewUserStoryWrapper params={params} />
    </div>
  );
}
