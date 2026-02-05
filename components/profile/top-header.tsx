import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Ellipsis, Mail } from "lucide-react";
import { PROFILE_NAV } from "@/lib/placeholder-data";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getProfileHeader } from "@/data/user";
import UploadAvatar from "./upload-avatar";
import UploadCover from "./upload-cover";
import { getFriendStatus } from "@/data/friend";
import FriendButton from "./friend-button";
import { nanoid } from "nanoid";

export default async function ProfileHeader({ userId }: { userId: string }) {
  const profileDetails = await getProfileHeader(userId);
  const friend = await getFriendStatus(userId);

  const avatarId = nanoid();
  const coverId = nanoid();

  return (
    <Card className="p-0 gap-0 overflow-hidden w-full">
      {/* Cover Photo */}
      <UploadCover
        key={coverId}
        name={profileDetails.name}
        cover={profileDetails.cover}
        userId={userId}
      />

      <div className="relative p-4 md:pb-8.5">
        {/* Profile Image */}
        <UploadAvatar
          key={avatarId}
          name={profileDetails.name}
          avatar={profileDetails.avatar}
          userId={userId}
        />

        <div className="mt-6 md:mt-0 md:ml-35 flex gap-4 flex-col text-center md:text-left md:flex-row items-center md:justify-between">
          {/* User Details  */}
          <div>
            <h1 className="text-2xl font-bold">{profileDetails.name}</h1>
            <p className="text-gray-500">@{profileDetails.username}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {friend && (
              <FriendButton
                friend={friend?.friend}
                friendType={friend?.friendType}
                userId={userId}
              />
            )}
            <Button variant="secondary" className="h-9 md:size-11">
              <Mail className="h-4 md:h-6! w-4 md:w-6!" />
              <span className="md:hidden">Message</span>
            </Button>
            <Button variant="secondary" className="size-9 md:size-11">
              <Ellipsis className="h-4 md:h-6! w-4 md:w-6!" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10 border-t px-6 pt-4">
        {PROFILE_NAV.map((link, i) => (
          <Link
            href="#"
            key={link}
            className={cn(
              "pb-3 text-muted-foreground font-semibold text-sm",
              i === 0 &&
                "border-b-2 border-b-card-foreground text-card-foreground",
            )}
          >
            {link}
          </Link>
        ))}
      </div>
    </Card>
  );
}
