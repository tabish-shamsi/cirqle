"use client";

import { formatDate } from "@/utils/formatDate";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import MediaSlider from "./media-slider";
import { Button } from "../ui/button";
import { Heart, MessageCircle, Send, SendHorizonal, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Input } from "../ui/input";
import Comments from "./comments";
import { useRouter } from "next/navigation";

export default function SinglePostCard({ post, setOpen }: any) {
  const router = useRouter();
  const handleClose = () => {
    if (setOpen) setOpen(false);
    router.back();
  };
  return (
    <Card className="gap-0 p-0">
      <CardHeader className="relative w-full flex items-center justify-center gap-0 p-6">
        <h2 className="text-xl font-bold">{post.author.name}'s Post</h2>

        <Button
          variant="secondary"
          className="absolute  top-4 right-4 h-10 w-10 flex items-center justify-center rounded-full text-muted-foreground"
          onClick={handleClose}
        >
          <X />
        </Button>
      </CardHeader>
      <Separator />

      <ScrollArea className="h-[450px]">
        <CardContent className="space-y-4 py-6">
          <div className="flex flex-row gap-3 items-center">
            <Avatar className="w-11 h-11">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>
                {post.author.name
                  .split(" ")
                  .map((n: any[]) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>

            <div>
              <p className="text-lg font-medium leading-none">
                {post.author.name}
                {post.message && (
                  <span className="text-xs text-muted-foreground ml-1">
                    {post.message}
                  </span>
                )}
              </p>
              <p className="text-sm text-muted-foreground capitalize">
                {formatDate(post.createdAt)}
              </p>
            </div>
          </div>

          <p>{post.content}</p>

          <MediaSlider media={post.media} />

          <div className="flex items-center ">
            <Button className="text-muted-foreground" variant="ghost">
              <Heart className="h-4 w-4" />
              {post.likes}
            </Button>
            <Button className="text-muted-foreground" variant="ghost">
              <MessageCircle className="h-4 w-4" />
              {post.comments}
            </Button>
            <Button className="text-muted-foreground" variant="ghost">
              <SendHorizonal className="h-4 w-4" />
              126
            </Button>
          </div>
          <Comments />
        </CardContent>
      </ScrollArea>
      <CardFooter className="flex items-center gap-2 p-6">
        <Avatar className="w-10 h-10">
          <AvatarImage src={post.author.avatar} />
          <AvatarFallback>
            {post.author.name
              .split(" ")
              .map((n: any[]) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 relative">
          <Input
            placeholder="Add a comment..."
            className="rounded-full placeholder:text-muted-foreground"
          />
          <Button
            variant="ghost"
            className="absolute top-1/2 right-2 -translate-y-1/2 h-10 w-10"
          >
            <Send className="text-sidebar-ring" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
