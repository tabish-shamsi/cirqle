"use client";

import FriendCard from "@/components/friends/friend-card";
import IUser from "@/types/User";
import { RefObject, useEffect, useRef, useState } from "react";
import FriendStatus from "./friend-status";
import useInView from "@/hooks/useInView";
import { loadMoreUsers } from "./actions";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type UserWithFriendStatus = IUser & {
  friendStatus: "pending" | "accepted" | null;
  requestor: string | null;
  friendId: string;
};

export default function PeopleGrid({
  initialUsers,
}: {
  initialUsers: UserWithFriendStatus[];
}) {
  const [users, setUsers] = useState<UserWithFriendStatus[]>(initialUsers);
  const [isEnd, setIsEnd] = useState(false);
  const [count, setCount] = useState(1);
  const loadingElement = useRef<HTMLDivElement>(null);
  const isIntersecting = useInView(
    loadingElement as RefObject<HTMLDivElement>,
    {
      threshold: 1,
      rootMargin: "150px",
    },
  );

  console.log(initialUsers);

  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const loadMore = async () => {
    const users = await loadMoreUsers({ count, search: q ?? "" });

    if (users.length > 0) {
      setUsers((prev) => [...prev, ...users]);
      setCount((prev) => prev + 1);
    } else {
      setIsEnd(true);
    }
  };

  useEffect(() => {
    loadMore();
  }, [isIntersecting]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: UserWithFriendStatus) => (
          <FriendCard
            key={user._id}
            friend={user}
            actions={
              <FriendStatus
                friendStatus={user.friendStatus}
                requestor={user.requestor}
                userId={user._id}
                friendId={user.friendId}
              />
            }
          />
        ))}
      </div>
      {isEnd ? (
        <p className="text-muted-foreground text-sm text-center">
          You have reach the end
        </p>
      ) : (
        <Card ref={loadingElement}>
          <CardContent className="flex justify-center w-full ">
            <Loader2 className="animate-spin text-primary" />
          </CardContent>
        </Card>
      )}
    </>
  );
}
