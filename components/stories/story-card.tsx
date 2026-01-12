import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

export default function StoryCard({ story }: { story: any }) {
  const preview = story.media[0];

  return (
    <Link href={`/stories/${story.user.name}`}>
      <div className="relative h-full rounded-xl overflow-hidden cursor-pointer shadow-sm">
        {/* Story preview */}
        <Image
          src={preview.url}
          alt="story preview"
          fill
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* User avatar */}
        <div className="absolute top-2 left-2 rounded-full border-2 border-primary overflow-hidden">
          <Avatar className="h-12 w-12">
            <AvatarImage src={story.user.avatar} />
            <AvatarFallback>
              {story.user.name
                .split(" ")
                .map((n: any[]) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Username */}
        <span className="absolute bottom-2 left-2 right-2 text-white text-base font-semibold truncate">
          {story.user.name}
        </span>
      </div>
    </Link>
  );
}
