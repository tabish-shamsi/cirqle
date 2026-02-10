import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { StoryItem } from "@/types/Story";
import { getUserInitials } from "@/utils/getUserInitials";
import { cn } from "@/lib/utils";
import avatarUrl from "@/utils/avatarUrl";

export default function StoryCard({ storyItem }: { storyItem: StoryItem }) {
  return (
    <Link href={`/stories/${storyItem.author.username}`}>
      <div className="relative h-full rounded-xl overflow-hidden cursor-pointer shadow-sm">
        {/* Story preview */}
        <Image
          src={`${storyItem.story.media.url}?tr=h-400,w-200,c-at_max,fo-auto,f-auto,q-auto`}
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
            storyItem.hasUnread ? "border-primary" : "border-muted",
          )}
        >
          <Avatar className="h-12 w-12">
            <AvatarImage src={avatarUrl(storyItem.author?.avatar ?? "")} />
            <AvatarFallback>
              {getUserInitials(storyItem.author.name)}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Username */}
        <span className="absolute bottom-2 left-2 right-2 text-white text-base font-semibold truncate">
          {storyItem.author.name}
        </span>
      </div>
    </Link>
  );
}
