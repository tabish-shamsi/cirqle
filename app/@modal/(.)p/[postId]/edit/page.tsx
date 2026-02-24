import EditPostWrapper from "@/components/posts/edit-post-wrapper";
import EditPostSkeleton from "@/components/skeletons/edit-post-skeleton";
import { Suspense } from "react";

export default function EditPost({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  return (
    <Suspense fallback={<EditPostSkeleton />}>
      <EditPostWrapper params={params} />
    </Suspense>
  );
}
