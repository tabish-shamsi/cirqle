"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import CreateStoryCard from "./create-story-card";
import IStory from "@/types/Story";
import StoryCard from "./story-card";

export default function StoriesSlider({ stories }: { stories: IStory[] }) {
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

      {stories.map((story: IStory) => (
        <SwiperSlide key={story._id} className="h-50!">
          <StoryCard story={story} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
