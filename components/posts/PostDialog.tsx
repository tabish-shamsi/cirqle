"use client";

import SinglePostCard from "@/components/posts/single-post-card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PostDialog({ post }: any) {
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    router.back();
  };

  return (
    <Dialog defaultOpen open={open} onOpenChange={handleClose}>
      <DialogOverlay>
        <DialogContent
          showCloseButton={false}
          className="p-0 rounded-xl md:max-w-[600px]"
        >
          <DialogHeader className="hidden">
            <DialogTitle>{post.author.name}'s Post</DialogTitle>
          </DialogHeader>
          <SinglePostCard post={post} />
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
