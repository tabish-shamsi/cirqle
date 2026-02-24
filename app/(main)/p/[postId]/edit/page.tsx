import EditPostWrapper from "@/components/posts/edit-post-wrapper";
import EditPostSkeleton from "@/components/skeletons/edit-post-skeleton";
import { Suspense } from "react";

export default function EditPostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  return (
    <div className="flex items-center justify-center mb-4">
      <div className="w-full md:w-3/4">
        <Suspense fallback={<EditPostSkeleton />}>
          <EditPostWrapper params={params} />
        </Suspense>
      </div>
    </div>
  );
}
