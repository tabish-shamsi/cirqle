import "swiper/css";
import StoriesSlider from "./stories-slider";
import { getFeedStories } from "@/data/story";
import { nanoid } from "nanoid";

export default async function Stories() {
  const stories = await getFeedStories();
  const id = nanoid();

  return (
    <div className="w-full py-4">
      <StoriesSlider key={id} stories={stories} />
    </div>
  );
}
