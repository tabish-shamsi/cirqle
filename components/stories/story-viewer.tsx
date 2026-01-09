"use client";

import { useEffect, useId, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { stories } from "@/lib/temporary-mock-data";

export default function StoryViewer({ storyId }: { storyId: string }) {
  const router = useRouter();
  const [mediaIndex, setMediaIndex] = useState(0);
  const id = useId()

  const story = stories.find((s) => s.id === storyId);
  const media = story?.media[mediaIndex];

  useEffect(() => {
    if (!media) return;

    const timer = setTimeout(() => {
      if (mediaIndex < (story?.media.length ?? 0) - 1) {
        setMediaIndex((i) => i + 1);
      } else {
        router.back();
      }
    }, 5000); // 5 seconds for each media

    return () => clearTimeout(timer);
  }, [mediaIndex, media, story, router]);

  if (!story || !media) return null;

  return (
    <Dialog key={id} open={!!storyId} onOpenChange={() => router.push("/")}>
      <DialogContent className="w-full max-w-3xl h-[90vh] p-0 bg-black rounded-none overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={media.url}
            alt={story.user.name}
            fill
            className="object-contain"
          />

          {/* Top info */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500">
              <Image
                src={story.user.avatar}
                alt={story.user.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-white font-semibold">{story.user.name}</span>
          </div>

          {/* Close button */}
          <button
            onClick={() => router.back()}
            className="absolute top-4 right-4 text-white"
          >
            X
          </button>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 flex gap-1 p-2">
            {story.media.map((m, idx) => (
              <div
                key={m.id}
                className="flex-1 h-1 bg-white/30 rounded overflow-hidden"
              >
                <div
                  className={`h-full bg-white rounded ${
                    idx === mediaIndex
                      ? "animate-fill"
                      : idx < mediaIndex
                        ? "w-full"
                        : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
