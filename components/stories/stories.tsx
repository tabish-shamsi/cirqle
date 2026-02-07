import "swiper/css"; 
import StoriesSlider from "./stories-slider";
import { getStories, storiesReadStatus } from "@/data/story";

export default async function Stories() {
  const stories = await getStories()
  
  return (
    <div className="w-full py-4">
      <StoriesSlider stories={stories} /> 
    </div>
  );
}
