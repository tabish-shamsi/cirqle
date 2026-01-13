"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { stories } from "@/lib/temporary-mock-data";
import ViewStoryCard from "@/components/stories/view-story-card";
import StoryProgress from "@/components/stories/story-progress";

export default function StoriesPage() {
  const { username } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const startUserIndex = stories.findIndex((s) => s.user.name === username);

  const [userIndex, setUserIndex] = useState(
    startUserIndex >= 0 ? startUserIndex : 0
  );
  const [mediaIndex, setMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const story = stories[userIndex];
  const media = story.media[mediaIndex];

  // Auto progress
  useEffect(() => {
    setProgress(0);
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / media.duration) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        next();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [mediaIndex, userIndex]);

  const next = () => {
    if (mediaIndex < story.media.length - 1) {
      setMediaIndex(mediaIndex + 1);
    } else if (userIndex < stories.length - 1) {
      setUserIndex(userIndex + 1);
      setMediaIndex(0);
    }
  };

  const prev = () => {
    if (mediaIndex > 0) {
      setMediaIndex(mediaIndex - 1);
    } else if (userIndex > 0) {
      const prevUser = stories[userIndex - 1];
      setUserIndex(userIndex - 1);
      setMediaIndex(prevUser.media.length - 1);
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center">
      <div className="relative">
        <ViewStoryCard
          imageUrl={media.url}
          username={story.user.name}
          avatar={story.user.avatar}
        >
          <StoryProgress
            count={story.media.length}
            activeIndex={mediaIndex}
            progress={progress}
          />
        </ViewStoryCard>

        {/* Navigation zones */}
        <button className="absolute left-0 top-0 h-full w-1/2" onClick={prev} />
        <button
          className="absolute right-0 top-0 h-full w-1/2"
          onClick={next}
        />
      </div>
    </div>
  );
}
