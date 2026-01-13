import {
  Camera,
  Image,
  Paperclip,
  PictureInPicture,
  Video,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { user } from "@/lib/temporary-mock-data";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function CreatePost() {
  return (
    <Card className="w-full gap-4">
      <CardHeader>
        <div className="flex items-center gap-2">
          <span className="bg-muted flex items-center justify-center h-10 w-10 rounded-full">
            <Paperclip size={18} className="text-primary" />
          </span>
          <p className="text-muted-foreground text-base font-medium">
            Create Post
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex pl-3 text-muted-foreground">
            <Avatar className="h-8 w-8 mt-2">
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <Textarea
            placeholder="What's on your mind?"
            className={
              "peer pl-14 h-25 resize-none rounded-xl placeholder:text-muted-foreground placeholder:font-medium"
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap">
        <Button variant="ghost">
          <Video className="text-red-500 w-5! h-5!" />
          <span className="text-muted-foreground font-semibold text-sm">
            Live Video
          </span>
        </Button>

        <Button variant="ghost">
          <Image className="text-green-500 w-5! h-5!" />
          <span className="text-muted-foreground font-semibold text-sm">
            Photo/Video
          </span>
        </Button>

        <Button variant="ghost">
          <Camera className="text-yellow-500 w-5! h-5!" />
          <span className="text-muted-foreground font-semibold text-sm">
            Feelings/Activity
          </span>
        </Button>
      </CardFooter>
    </Card>
  );
}
