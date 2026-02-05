"use client";

import { Image, Loader2, Paperclip, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ChangeEvent, useRef, useState } from "react";
import { getUserInitials } from "@/utils/getUserInitials";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import validateMedia from "@/utils/validateMedia";
import { nanoid } from "nanoid";
import uploadMedia from "@/utils/uplaod-media";
import IPost from "@/types/Post";
import deleteMedia from "@/actions/media/delete-media";
import editPost from "@/actions/post/edit-post";

interface ILocalMedia {
  _id: string;
  url: string;
  type: "image" | "video";
  status: "pending" | "success" | "error";
}

export default function EditPostCard({ post: initialPost }: { post: IPost }) {
  const [post, setPost] = useState<IPost>(initialPost);
  const [media, setMedia] = useState<ILocalMedia[]>(
    post.media
      ? post.media.map((m) => {
          return {
            _id: m._id,
            url: m.url,
            type: m.type,
            status: "success" as const,
          };
        })
      : [],
  );

  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [isEditing, setIsEditing] = useState(false)

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    setIsUploadingMedia(true);

    if (media.length >= 4) {
      toast.error("You can upload up to 4 images");
      return;
    }

    const files = Array.from(e.target.files ?? []);
    const validatedMedia = validateMedia(files);
    if (validatedMedia?.error) {
      toast.error(validatedMedia?.error);
      setIsUploadingMedia(false);
      return;
    }

    if (validatedMedia.type) {
      if (
        post.postType &&
        validatedMedia.type &&
        post.postType !== validatedMedia.type
      ) {
        toast.error("You cannot mix photos and videos");
        setIsUploadingMedia(false);

        return;
      } else setPost({ ...post, postType: validatedMedia.type });
    }

    Promise.all(
      files.map(async (file: File) => {
        const id = nanoid();
        const newMedia: ILocalMedia = {
          url: URL.createObjectURL(file),
          type: file.type.startsWith("video") ? "video" : "image",
          _id: id,
          status: "pending",
        };

        setMedia((prev) => [...prev, newMedia]);

        const mediaRes = await uploadMedia(file);
        if (mediaRes) {
          if (mediaRes.error) {
            toast.error(mediaRes.error);
            setIsUploadingMedia(false);
            return;
          } else if (mediaRes.fileId) {
            setMedia((prev) =>
              prev.map((m) =>
                m._id === id
                  ? { ...m, _id: mediaRes.fileId, status: "success" as const }
                  : m,
              ),
            );
          }
        }
      }),
    );
    setIsUploadingMedia(false);
  };

  const handleUpload = async () => {
    setIsEditing(true)
    const res = await editPost({
      postId: post._id.toString(),
      content: post.content,
      media: media.map((m) => {
        return m._id;
      }),
      postType: post.postType
    });

    if (res.error) {
      toast.error(res.error);
      setIsEditing(false)
      return;
    }
    
    router.back()
  };

  const removeMedia = async (mediaId: string) => {
    const res = await deleteMedia(mediaId, post._id.toString());

    if (res.success) {
      setMedia(media.filter((m) => m._id !== mediaId));
    }
  };

  return (
    <Card className="w-full gap-4">
      <CardHeader>
        <div className="flex items-center gap-2 relative">
          <span className="bg-muted flex items-center justify-center h-10 w-10 rounded-full">
            <Paperclip size={18} className="text-primary" />
          </span>
          <p className="text-muted-foreground text-base font-medium">
            Edit Your Post
          </p>

          <Button
            className="absolute top-0 right-0 rounded-full px-0 py-0 h-9 w-9"
            variant="ghost"
            onClick={() => router.back()}
          >
            <X />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex pl-3 text-muted-foreground">
            <Avatar className="h-8 w-8 mt-2">
              <AvatarImage
                src={post.author.avatar?.url}
                alt={post.author.name}
                className="object-cover"
              />
              <AvatarFallback>
                {getUserInitials(post.author.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          <Textarea
            placeholder="What's on your mind?"
            className={
              "peer pl-14 resize-none rounded-xl placeholder:text-muted-foreground placeholder:font-medium"
            }
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />

          {media.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {media.map((m) => (
                <div
                  key={m._id}
                  className="relative rounded-xl overflow-hidden"
                >
                  {m.type === "image" ? (
                    <img src={m.url} className="h-40 w-full object-cover" />
                  ) : (
                    <video src={m.url} className="h-40 w-full object-cover" />
                  )}

                  {/* Overlay */}
                  {m.status === "pending" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="animate-spin text-white" />
                    </div>
                  )}

                  {m.status === "error" && (
                    <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center text-white">
                      Failed
                    </div>
                  )}

                  <Button
                    onClick={() => removeMedia(m._id)}
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

        <Button onClick={handleUpload} disabled={isUploadingMedia}>
          {/* {loading ? "Editing Post..." : "Edit Post"} */}
          Edit Post
        </Button>
      </CardFooter>
    </Card>
  );
}
