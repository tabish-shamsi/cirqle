"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials } from "@/utils/getUserInitials";
import StoryProgress from "./story-progress";
import IUser from "@/types/User";
import IStory from "@/types/Story";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Trash, X } from "lucide-react";
import updateStoryReaders from "@/actions/story/update-story-readerst";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import deleteStory from "@/actions/story/delete-story";

type Props = {
  author: IUser;
  stories: IStory[];
};

export default function ViewStoryCard({ author, stories }: Props) {
  const [storyIndex, setStoryIndex] = useState(0); // the index of the story currently slected
  const [progress, setProgress] = useState(0);

  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    setProgress(0);
    markRead();
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / 5000) * 100, 100);
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        next();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [storyIndex]);

  function next() {
    if (storyIndex < stories.length - 1) {
      setStoryIndex((prev) => prev + 1);
    } else {
      router.back();
    }
  }

  function prev() {
    if (storyIndex > 0) {
      setStoryIndex((prev) => prev - 1);
    }
  }

  function close() {
    router.back();
  }

  const story = stories[storyIndex];

  async function markRead() {
    const res = await updateStoryReaders(story._id);
    if (res.error) toast.error(res.error);
  }

  async function delStory() {
    const res = await deleteStory({
      storyId: story._id,
      mediaId: story.media._id,
    });

    if (res.success) {
      toast.success("Story deleted");
      router.back();
    } else toast.error(res.error);
  }

  return (
    <>
      <div className="relative h-150 my-8 w-87.5 overflow-hidden rounded-xl bg-black">
        <img
          src={story.media.url}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="absolute top-3 left-3 right-3 space-y-3 z-10">
          <StoryProgress
            count={stories.length}
            activeIndex={storyIndex}
            progress={progress}
          />

          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              {author?.avatar && <AvatarImage src={author.avatar.url} />}
              <AvatarFallback>{getUserInitials(author.name)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-white">
              {author.username}
            </span>
          </div>
        </div>
      </div>

      <button
        className="absolute left-0 top-0 h-full w-1/2 outline-none"
        onClick={prev}
      />
      <button
        className="absolute right-0 top-0 h-full w-1/2 outline-none"
        onClick={next}
      />

      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 h-9 w-9 rounded-full"
        onClick={close}
      >
        <X />
      </Button>

      {user && user.id === author._id && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-14 right-4 h-8 w-8"
              onClick={delStory}
            >
              <Trash />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Delete Story</p>
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}
