"use client";

import useAuth from "@/hooks/useAuth";
import IMedia from "@/types/Media";
import uploadMedia from "@/utils/uplaod-media";
import { usePathname } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getUserInitials } from "@/utils/getUserInitials";
import { Loader2 } from "lucide-react";
import createAvatarCoverPost from "@/actions/user/upload-avatar-cover";
import deleteMedia from "@/actions/media/delete-media";
import avatarUrl from "@/utils/avatarUrl";

export default function UploadAvatar({
  avatar,
  name,
  userId,
}: {
  avatar?: IMedia;
  name: string;
  userId: string;
}) {
  const { update, user } = useAuth();
  const pathname = usePathname();
  const [preview, setPreview] = useState<{
    url: string;
    status: "pending" | "error" | "success";
  } | null>(
    avatar
      ? {
          url: avatarUrl(avatar.url),
          status: "success",
        }
      : null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleAvatarUpload(e: ChangeEvent<HTMLInputElement>) {
    if (pathname !== "/profile") {
      return;
    }

    const files = e.target.files;
    if (!files || files.length <= 0) {
      toast.error("Select an image to upload");
      return;
    }

    const file = files[0];
    setPreview({ url: URL.createObjectURL(file), status: "pending" });

    const media = await uploadMedia(file);
    if (media?.error || !media?.fileId) {
      toast.error(
        media?.error ?? "Something went wrong, please try again later",
      );
      setPreview(preview && { ...preview, status: "error" });
      return;
    }

    setPreview({ url: media.url, status: "success" });
    await update({ avatar: media.url });

    const post = await createAvatarCoverPost({
      mediaId: media.fileId,
      type: "avatar",
      userId,
    });
    if (post.error) {
      toast.error(post.error);
      await deleteMedia(media.fileId);
      return;
    }

    toast.success(post.message);
  }

  const isOwner = userId === user?.id;

  return (
    <>
      <div className="w-30 h-30 border-4 border-card rounded-full absolute -top-22 md:-top-6 left-1/2 -translate-x-1/2 md:left-20 overflow-hidden z-2">
        <Avatar className="w-full h-full text-3xl font-bold">
          <AvatarImage
            src={preview?.url}
            className="w-full h-full"
          />
          <AvatarFallback>{getUserInitials(name)}</AvatarFallback>
        </Avatar>

        {preview?.status === "pending" && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Loader2 className="animate-spin text-white" />
          </div>
        )}

        {preview?.status === "error" && (
          <div className="absolute inset-0 bg-red-500/50 flex items-center justify-center text-white">
            Failed
          </div>
        )}

        {isOwner && (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="bg-none absolute top-0 left-0 rounded-full w-full h-full flex z-1"
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarUpload}
              className="hidden"
            />
          </div>
        )}
      </div>
    </>
  );
}
