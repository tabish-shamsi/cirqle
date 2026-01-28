"use client"

import {
  Image,
  Paperclip,
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChangeEvent, useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { getUserInitials } from "@/utils/getUserInitials";
import { toast } from "sonner";
import uploadMedia from "@/utils/uplaod-media";
import { Skeleton } from "../ui/skeleton";
import mongoose from "mongoose";
import createMedia from "@/actions/media/create-media";

type MediaItem = mongoose.Types.ObjectId
type PreviewType = { url: string; type: string; }

export default function CreatePost() {
  const [content, setContent] = useState("")
  const [media, setMedia] = useState<MediaItem[]>([])
  const [postType, setPostType] = useState("")
  const [previews, setPreviews] = useState<PreviewType[]>([])
  const [isUploadingMedia, setIsUploadingMedia] = useState(false)

  const [contentError, setContentError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const { isAuthenticated, isLoading, user } = useAuth()
  if (!isLoading && !isAuthenticated) throw new Error("User is not logged in ")

  async function handleUpload() {

  }

  const handleMediaUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploadingMedia(true)

    if (media.length >= 4) {
      toast.error("You can upload up to 4 images")
      return
    }

    const files = Array.from(e.target.files ?? [])
    const mediaFiles = validateMedia(files)
    if (mediaFiles?.error) {
      toast.error(mediaFiles?.error)
      return
    }

    if (postType && postType !== mediaFiles.type) {
      toast.error("You cannot mix photos and videos")
      return
    }

    if (mediaFiles.type) setPostType(mediaFiles.type)

    const nextPreviews = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
    }));

    setPreviews(nextPreviews);

    // Upload files sequentially and update media state
    const uploadedMediaIds: mongoose.Types.ObjectId[] = [];
    for (const file of files) {
      const mediaRes = await uploadMedia(file);
      if (mediaRes && mediaRes.url && mediaRes.imagekitId && mediaRes.type) {
        const createResult = await createMedia({
          type: mediaRes.type,
          url: mediaRes.url,
          imagekitId: mediaRes.imagekitId
        });

        if (createResult.success && createResult.mediaId) {
          uploadedMediaIds.push(createResult.mediaId);
        }
      }
    }

    setMedia(prevMedia => [...prevMedia, ...uploadedMediaIds]);
    setIsUploadingMedia(false)
  }

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
            {
              isLoading ? (
                <Skeleton className="h-8 w-8 mt-2 rounded-full" />
              ) : (
                <Avatar className="h-8 w-8 mt-2">
                  <AvatarImage
                    src={user?.avatar}
                    alt={user?.name}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {getUserInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
              )
            }
          </div>

          <Textarea
            placeholder="What's on your mind?"
            className={
              "peer pl-14 h-25 resize-none rounded-xl placeholder:text-muted-foreground placeholder:font-medium"
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between">
        <input accept="image/*,video/*" multiple onChange={handleMediaUpload} type="file" ref={fileInputRef} hidden className="hidden" />
        <Button disabled={isUploadingMedia} onClick={() => fileInputRef.current?.click()} variant="ghost">
          <Image className="text-green-500 w-5! h-5!" />
          <span className="text-muted-foreground font-semibold text-sm">
            Photo/Video
          </span>
        </Button>

        <Button onClick={handleUpload}>Create Post</Button>
      </CardFooter>
    </Card >
  );
}

function validateMedia(files: File[]) {
  const images = files.filter(f => f.type.startsWith("image"));
  const videos = files.filter(f => f.type.startsWith("video"));

  if (videos.length > 0 && images.length > 0) {
    return { error: "You cannot mix images and videos" }
  }

  if (videos.length > 1) {
    return { error: "Only one video is allowed" }
  }

  if (images.length > 4) {
    return { error: "You can upload up to 4 images" }
  }

  return { type: videos.length ? "video" : "image" };
}