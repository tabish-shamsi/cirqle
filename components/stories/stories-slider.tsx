import { Swiper, SwiperSlide } from "swiper/react";
import StoryCard from "./story-card";
import CreateStoryCard from "./create-story-card";

export default function StoriesSlider({ stories }: { stories: any }) {
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

      {stories.map((story: any) => (
        <SwiperSlide key={story.user.id} className="h-50!">
          <StoryCard key={story.id} story={story} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
