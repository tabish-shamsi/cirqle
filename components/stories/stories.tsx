"use client";
 
import "swiper/css"; 
import StoriesSlider from "./stories-slider";
import { stories } from "@/lib/temporary-mock-data";
import StoryViewer from "./story-viewer";

export default function Stories() {
  return (
    <div className="w-full py-4">
      <StoriesSlider stories={stories} /> 
    </div>
  );
}
