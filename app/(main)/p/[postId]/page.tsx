import SinglePost from "@/components/posts/single-post"; 
import { Suspense } from "react";

export default async function page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) { 
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SinglePost params={params} />
    </Suspense>
  );
}
