"use client"

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useAuth from "@/hooks/useAuth";
import { Skeleton } from "../ui/skeleton";
import { getUserInitials } from "@/utils/getUserInitials";

export default function UserAvatar() {
  const { user, isLoading } = useAuth()
  if (isLoading || !user) {
    return (
      <div className="pr-6 lg:pr-8 p-3 hidden lg:block">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    )
  } else {
    return (
      <Link href="/profile" className="pr-6 lg:pr-8 p-3 hidden lg:block">
        <Avatar className="h-10  w-10    ">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
        </Avatar>
      </Link>
    );
  }
}
