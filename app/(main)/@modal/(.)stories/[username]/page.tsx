import ViewUserStoryWrapper from "@/components/stories/view-story-wrapper";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Suspense } from "react";

export default function ViewStory({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return (
    <Dialog defaultOpen>
      <DialogOverlay>
        <DialogContent
          showCloseButton={false}
          className="p-0 rounded-xl bg-none"
        >
          <DialogHeader className="hidden">
            <DialogTitle>View Story</DialogTitle>
          </DialogHeader>
          <div className="flex h-[calc(80vh)] w-full items-center justify-center relative">
            <Suspense fallback={<p>Loading...</p>}>
              <ViewUserStoryWrapper params={params} />
            </Suspense>
          </div>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
