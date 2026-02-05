import EditPostCard from "@/components/posts/edit-post";
import EditPostWrapper from "@/components/posts/edit-post-wrapper";
import EditPostSkeleton from "@/components/skeletons/edit-post-skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Suspense } from "react";

export default function EditPost({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  return (
    <Dialog open>
      <DialogOverlay>
        <DialogContent
          showCloseButton={false}
          className="p-0 rounded-xl md:max-w-150"
        >
          <DialogHeader className="hidden">
            <DialogTitle>Edit Post Instance</DialogTitle>
          </DialogHeader>

          <Suspense fallback={<EditPostSkeleton />}>
            <EditPostWrapper params={params} />
          </Suspense>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
