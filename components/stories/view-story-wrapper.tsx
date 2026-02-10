import { getUserStory } from "@/data/story";
import ViewStoryCard from "./view-story-card";

export default async function ViewUserStoryWrapper({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const { author, stories } = await getUserStory({ username });

  return <ViewStoryCard author={author} stories={stories} />;
}
