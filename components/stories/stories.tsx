import "swiper/css";
import StoriesSlider from "./stories-slider";
import { getFeedStories } from "@/data/story";

export default async function Stories() {
  const stories = await getFeedStories();

  return (
    <div className="w-full py-4">
      <StoriesSlider stories={stories} />
    </div>
  );
}
