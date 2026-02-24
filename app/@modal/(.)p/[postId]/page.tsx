import PostDiaglogWrapper from "@/components/posts/post-dialog-wrapper";
import PostDialogSkeleton from "@/components/skeletons/post-dialog-skeleton";
import { Suspense } from "react";

export default function page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  return (
    <Suspense fallback={<PostDialogSkeleton />}>
      <PostDiaglogWrapper params={params} />
    </Suspense>
  );
}
