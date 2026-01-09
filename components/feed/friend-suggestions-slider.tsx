"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { friends } from "@/lib/temporary-mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

export default function FriendSuggestionsSlider() {
  return (
    <div className="">
      <Swiper
        slidesPerView={3} // Number of slides visible at a time
        spaceBetween={16}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
        }}
        className="friend-suggestions-slider p-2!"
      >
        {friends.friends.map((friend) => (
          <SwiperSlide key={friend.id}>
            <Card className="w-full">
              <CardContent className="flex flex-col items-center justify-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={friend.avatar} />
                  <AvatarFallback>
                    {friend.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="text-center ">
                  <p className="text-lg font-medium leading-none">
                    {friend.name}
                  </p>
                  <p className="text-sm text-muted-foreground capitalize">
                    @{friend.username}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full text-sm"
                >
                  Add Friend
                </Button>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
