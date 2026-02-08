"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import CreateStoryCard from "./create-story-card";
import IStory, { StoryItem } from "@/types/Story";
import StoryCard from "./story-card";

export default function StoriesSlider({ stories }: { stories: StoryItem[] }) {
  return (
    <Swiper
      slidesPerView={4}
      breakpoints={{
        320: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 4,
        },
      }}
      spaceBetween={16}
      className="p-2!"
    >
      {/* Create Story */}
      <SwiperSlide>
        <CreateStoryCard />
      </SwiperSlide>

      {stories.map((story: StoryItem) => (
        <SwiperSlide key={story._id} className="h-50!">
          <StoryCard storyItem={story} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
