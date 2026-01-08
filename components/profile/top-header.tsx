import Image from "next/image";
import { Card } from "../ui/card";
import { user } from "@/lib/temporary-mock-data";
import { Button } from "../ui/button";
import { Ellipsis, Mail, User } from "lucide-react";
import { PROFILE_NAV } from "@/lib/placeholder-data";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProfileHeader() {
  return (
    <Card className="p-0 gap-0 overflow-hidden w-full">
      {/* Cover Photo */}
      <div className="h-60.5 w-full bg-gray-200">
        <Image
          width={960}
          height={242}
          src={user.cover}
          alt={`${user.name} cover`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative p-4 md:pb-8.5">
        {/* Profile Image */}
        <div className="w-30 h-30 border-4 border-card rounded-full absolute -top-22 md:-top-6 left-1/2 -translate-x-1/2 md:left-20 overflow-hidden">
          <Image
            width={100}
            height={100}
            src={user.avatar}
            alt={`${user.name} cover`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mt-6 md:mt-0 md:ml-35 flex gap-4 flex-col text-center md:text-left md:flex-row items-center md:justify-between">
          {/* User Details  */}
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button className="h-9 md:h-11">
              <User />
              Add Friend
            </Button>
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
