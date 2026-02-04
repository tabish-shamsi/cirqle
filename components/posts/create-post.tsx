"use client";

import { Image, Loader2, Paperclip, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { getUserInitials } from "@/utils/getUserInitials";
import { toast } from "sonner";
import uploadMedia from "@/utils/uplaod-media";
import { Skeleton } from "../ui/skeleton";
import { nanoid } from "nanoid";
import createPost from "@/actions/post/create-post";
import deleteMedia from "@/actions/media/delete-media";
import IPost from "@/types/Post";
import { useRouter } from "next/navigation";

type MediaItem = string;
type PreviewType = {
  url: string;
  type: string;
  status: "pending" | "success" | "error";
  id: string;
};

export default function CreatePost({ userId }: { userId?: string }) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [postType, setPostType] = useState<"image" | "video" | null>(null);
  const [previews, setPreviews] = useState<PreviewType[]>([]);
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);

  const [contentError, setContentError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isAuthenticated, isLoading, user } = useAuth();
  if (!isLoading && !isAuthenticated) throw new Error("User is not logged in ");
  if (userId && userId !== user?.id) return;

  async function handleUpload() {
    setLoading(true);
    setContentError(null);

    if (!content || content.length === 0) {
      setContentError("The post cannot be empty");
      setLoading(false);
      return;
    }

    const res = await createPost({ content, media, postType });

    if (res.error) {
      toast.error(res.error);
      setLoading(false);
    }

    toast.success(res.message);
    setMedia([]);
    setPreviews([]);
    setContentError(null);
    setContent("");
    setLoading(false);
    setIsUploadingMedia(false);
  }

  const handleMediaUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploadingMedia(true);

    if (media.length >= 4) {
      toast.error("You can upload up to 4 images");
      return;
    }

    const files = Array.from(e.target.files ?? []);
    const mediaFiles = validateMedia(files);
    if (mediaFiles?.error) {
      toast.error(mediaFiles?.error);
      setIsUploadingMedia(false);

      return;
    }

    if (postType) {
      if (postType !== mediaFiles.type) {
        toast.error("You cannot mix photos and videos");
        setIsUploadingMedia(false);

        return;
      }
    } else {
      if (mediaFiles.type) setPostType(mediaFiles.type);
    }

    Promise.all(
      files.map(async (file: File) => {
        const id = nanoid();
        const preview: PreviewType = {
          url: URL.createObjectURL(file),
          type: file.type.startsWith("video") ? "video" : "image",
          id,
          status: "pending",
        };

        setPreviews((prev) => [...prev, preview]);

        const mediaRes = await uploadMedia(file);
        if (mediaRes) {
          if (mediaRes.error) {
            toast.error(mediaRes.error);
            setIsUploadingMedia(false);
            setPreviews((prev) =>
              prev.map((p) => (p.id === id ? { ...p, status: "error" } : p)),
            );
            return;
          } else if (mediaRes.fileId) {
            setPreviews((prev) =>
              prev.map((p) =>
                p.id === id
                  ? { ...p, status: "success", id: mediaRes?.fileId }
                  : p,
              ),
            );
            setMedia((prev) => [...prev, mediaRes?.fileId]);
          }
        }
      }),
    );
    setIsUploadingMedia(false);
  };

  const removeMedia = async (mediaId: string) => {
    const filteredMedia = previews.filter((p) => p.id === mediaId)[0];
    setPreviews((prev) => prev.filter((p) => p.id !== mediaId));

    const res = await deleteMedia(mediaId);

    if (res.error) {
      toast.error(res.error);
      setPreviews((prev) => [...prev, filteredMedia]);
      return;
    }

    setMedia((prev) => prev.filter((p) => p !== mediaId));
  };

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
            {isLoading ? (
              <Skeleton className="h-8 w-8 mt-2 rounded-full" />
            ) : (
              <Avatar className="h-8 w-8 mt-2">
                <AvatarImage
                  src={user?.avatar}
                  alt={user?.name}
                  className="object-cover"
                />
                <AvatarFallback>{getUserInitials(user?.name)}</AvatarFallback>
              </Avatar>
            )}
          </div>

          <Textarea
            placeholder="What's on your mind?"
            className={
              "peer pl-14 h-25 resize-none rounded-xl placeholder:text-muted-foreground placeholder:font-medium"
            }
            value={content}
            onChange={(e) => setContent(e.target.value)}
            aria-invalid={!!contentError}
          />
          {contentError && (
            <p className="text-sm text-destructive mt-1">{contentError}</p>
          )}

          {previews.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {previews.map((media) => (
                <div
                  key={media.id}
                  className="relative rounded-xl overflow-hidden"
                >
                  {media.type === "image" ? (
                    <img src={media.url} className="h-40 w-full object-cover" />
                  ) : (
                    <video
                      src={media.url}
                      className="h-40 w-full object-cover"
                    />
                  )}

                  {/* Overlay */}
                  {media.status === "pending" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="animate-spin text-white" />
                    </div>
                  )}

                  {media.status === "error" && (
                    <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center text-white">
                      Failed
                    </div>
                  )}

                  <Button
                    onClick={() => removeMedia(media.id)}
                    variant="ghost"
                    className="absolute top-2 right-2 rounded-full w-8 h-8"
                  >
                    <X />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between">
        <input
          accept="image/*,video/*"
          multiple
          onChange={handleMediaUpload}
          type="file"
          ref={fileInputRef}
          hidden
          className="hidden"
        />
        <Button
          disabled={isUploadingMedia || media.length >= 4}
          onClick={() => fileInputRef.current?.click()}
          variant="ghost"
        >
          <Image className="text-green-500 w-5! h-5!" />
          <span className="text-muted-foreground font-semibold text-sm">
            Photo/Video
          </span>
        </Button>

        <Button
          onClick={handleUpload}
          disabled={isLoading && isUploadingMedia && loading}
        >
          {loading ? "Creating Post..." : "Create Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}

function validateMedia(files: File[]) {
  if (files.length === 0) {
    return { error: "Please an image or video to continue" };
  }

  const images = files.filter((f) => f.type.startsWith("image"));
  const videos = files.filter((f) => f.type.startsWith("video"));

  if (videos.length > 0 && images.length > 0) {
    return { error: "You cannot mix images and videos" };
  }

  if (videos.length > 1) {
    return { error: "Only one video is allowed" };
  }

  if (images.length > 4) {
    return { error: "You can upload up to 4 images" };
  }

  const type: "image" | "video" = videos.length ? "video" : "image";

  return { type };
}
