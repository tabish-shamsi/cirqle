"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Ellipsis, MessageCircle, Pencil, Share2, Trash } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";
import MediaSlider from "./media-slider";
import { getUserInitials } from "@/utils/getUserInitials";
import LikeButton from "./like-button";
import IPost from "@/types/Post";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import deletePost from "@/actions/post/delete-post";
import { toast } from "sonner";

export function PostCard({ post, setPosts }: { post: IPost; setPosts: any }) {
  const { user, update } = useAuth();

  const handleDeletePost = async () => {
    const res = await deletePost(post._id.toString());
    if (!res.success) {
      toast.message(res.error);
      return;
    }

    if (post.specialType === "avatar" && post.media[0].url === user.avatar) {
      await update({ avatar: "" });
    }

    toast.message(res.message);
    setPosts((prev: IPost[]) =>
      prev.filter((p) => p._id.toString() !== post._id.toString()),
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row gap-3 items-center relative">
        <Avatar className="w-11 h-11">
          <AvatarImage src={post.author?.avatar?.url} />
          <AvatarFallback>{getUserInitials(post.author.name)}</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-lg font-medium leading-none">{post.author.name}</p>
          <p className="text-sm text-muted-foreground capitalize">
            {formatDate(post.createdAt)}
          </p>
        </div>

        {user && user.id === post.author._id.toString() && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-6"
              >
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem>
                <Pencil /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeletePost}>
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm">{post.content}</p>

        {post.media.length > 0 && <MediaSlider media={post.media} />}

        <div className="flex justify-between text-muted-foreground">
          <div className="flex gap-4">
            <LikeButton
              isLiked={post?.isLiked ?? false}
              likesCount={post?.likesCount ?? 0}
              postId={post._id.toString()}
            />

            <Link href={`/p/${post._id}`}>
              <Button variant="ghost" size="sm" className="gap-1">
                <MessageCircle className="h-4 w-4" />
                {post.commentsCount}
              </Button>
            </Link>
          </div>

          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
