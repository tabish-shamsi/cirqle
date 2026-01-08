import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import PostMediaGrid from "./post-media-grid"
import { formatDate } from "@/utils/formatDate"

export function PostCard({ post }: { post: any }) {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="flex flex-row gap-3 items-center">
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
            {post.message && <span className="text-xs text-muted-foreground ml-1">{post.message}</span>}
          </p>
          <p className="text-sm text-muted-foreground capitalize">
             {formatDate(post.createdAt)}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm">{post.content}</p>

        {post.media.length > 0 && (
          <PostMediaGrid media={post.media} />
        )}

        <div className="flex justify-between text-muted-foreground">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="gap-1">
              <Heart className="h-4 w-4" />
              {post.likes}
            </Button>

            <Button variant="ghost" size="sm" className="gap-1">
              <MessageCircle className="h-4 w-4" />
              {post.comments}
            </Button>
          </div>

          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
