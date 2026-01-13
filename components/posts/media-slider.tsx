"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MediaItem = {
  id: string;
  type: "image" | "video";
  url: string;
};

export default function MediaSlider({ media }: { media: MediaItem[] }) {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const prev = () => setIndex((i) => (i === 0 ? media.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === media.length - 1 ? 0 : i + 1));

  useEffect(() => {
    videoRefs.current.forEach((v) => {
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
    });
  }, [index]);

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black">
      {media[index].type === "image" ? (
        <Image
          src={media[index].url}
          fill
          alt=""
          className="object-cover w-full h-full"
        />
      ) : (
        <video
          src={media[index].url}
          controls
          className="h-full w-full object-cover"
        />
      )}

      {media.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-1 text-white"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {media.length > 1 && (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
          {media.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-2 w-2 rounded-full",
                i === index ? "bg-white" : "bg-white/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
