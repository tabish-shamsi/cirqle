"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import likeUnlikePost from "@/actions/post/like-unlike-post";
import { toast } from "sonner";

type Props = {
  likesCount: number;
  isLiked: boolean;
  postId: string;
};

export default function LikeButton({ likesCount, isLiked, postId }: Props) {
  const [liked, setLiked] = useState(isLiked);
  const [count, setCount] = useState(likesCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    const res = await likeUnlikePost(postId);
    if (res.error) toast.error(res.error);
    else {
      setCount(liked ? count - 1 : count + 1);
      setLiked(!liked);
    }

    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      onClick={handleLike}
      variant="ghost"
      size="sm"
      className="gap-1"
    >
      <Heart className={cn("h-4 w-4", liked && "text-primary")} />
      {count}
    </Button>
  );
}
