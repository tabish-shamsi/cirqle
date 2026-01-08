"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { friends } from "@/lib/temporary-mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card } from "../ui/card";

export default function FriendSuggestionsSlider() {
  return (
    <>
      <Swiper slidesPerView={3} spaceBetween={22} slidesPerGroup={3} className="friend-suggestions-slider">
        {friends.friends.map((friend) => (
          <SwiperSlide className="" key={friend.id}>
            <Card className="">
              <Avatar className="w-11 h-11">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>
                  {friend.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="text-lg font-medium leading-none">
                  {friend.name}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  @{friend.username}
                </p>
              </div>
              <button className="add-friend-button">Add Friend</button>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
