import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import IStory from "@/types/Story";
import { getUserInitials } from "@/utils/getUserInitials";
import { useEffect, useState } from "react";
import getStoriesReadStatus from "@/actions/story/getStoriesReadStatus";
import { cn } from "@/lib/utils";
import avatarUrl from "@/utils/avatarUrl";

export default function StoryCard({ story }: { story: IStory }) {
  const [isRead, setIsRead] = useState(false);

  const checkStatus = async () => {
    const status = await getStoriesReadStatus(story.author._id);
    setIsRead(status);
  };

  useEffect(() => {
    checkStatus();
  }, []);

  console.log(`${story.media.url}?tr=h-400,w-200,c-at_max,fo-auto,f-auto,q-auto`);

  return (
    <Link href={`/stories/${story.author.name}`}>
      <div className="relative h-full rounded-xl overflow-hidden cursor-pointer shadow-sm">
        {/* Story preview */}
        <Image
          src={`${story.media.url}?tr=h-400,w-200,c-at_max,fo-auto,f-auto,q-auto`}
          alt="story preview"
          fill
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* User avatar */}
        <div
          className={cn(
            "absolute top-2 left-2 rounded-full border-2  overflow-hidden",
            isRead ? "border-muted" : "border-primary",
          )}
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl(story.author.avatar?.url ?? "")} />
            <AvatarFallback>
              {getUserInitials(story.author.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Username */}
        <span className="absolute bottom-2 left-2 right-2 text-white text-base font-semibold truncate">
          {story.author.name}
        </span>
      </div>
    </Link>
  );
}
