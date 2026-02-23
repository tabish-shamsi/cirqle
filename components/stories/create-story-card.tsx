"use client";

import Image from "next/image";
import { Loader2, Plus } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import uploadMedia from "@/utils/uplaod-media";
import createStory from "@/actions/story/create-story";
import useAuth from "@/hooks/useAuth";

export default function CreateStoryCard() {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const storyInput = useRef<HTMLInputElement>(null);

  const handleCreateStory = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length <= 0) {
      toast.error("Select an image to continue");
      return;
    }

    const file = files[0];

    setLoading(true);
    setPreview(URL.createObjectURL(file));

    const media = await uploadMedia(file);
    if (media?.error || !media?.fileId) {
      toast.error(media?.error);
      return;
    }

    const story = await createStory(media.fileId);
    if (story.success) return toast.success("Story created");

    setLoading(false);
    setPreview(null);
  };

  return (
    <div
      onClick={() => storyInput.current?.click()}
      className="relative w-full h-50 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-card " />

      {/* Top Image Placeholder */}
      <div className="relative h-35 w-full ">
        {user?.avatar && !preview ? (
          <Image
            src={`${user?.avatar}?tr=w-200,h-200`}
            alt="create story"
            fill
            className="object-cover"
          />
        ) : preview ? (
          <img
            src={preview!}
            alt="create story"
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex bg-muted"></div>
        )}

        {/* Overlay */}
        {loading && (
          <div className="flex items-center justify-center w-full h-full absolute top-0 left-0 bg-black/40">
            <Loader2 className="text-white animate-spin" />
          </div>
        )}

        <input
          ref={storyInput}
          type="file"
          accept="image/*"
          hidden
          className="hidden"
          onChange={handleCreateStory}
        />
      </div>

      {/* Plus Button */}
      <div className="absolute top-28.75 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center border-4 border-white">
        <Plus className="text-white w-5 h-5" />
      </div>

      {/* Label */}
      <div className="absolute bottom-3 left-0 right-0 text-center">
        <span className="text-sm font-semibold">
          {loading ? "Creating Story..." : "Create Story"}
        </span>
      </div>
    </div>
  );
}
