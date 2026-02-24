import ViewUserStoryWrapper from "@/components/stories/view-story-wrapper";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function ViewStory({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  return (
    <div className="flex h-full w-full items-center justify-center relative">
      <Suspense
        fallback={<Loader2 className="animate-spin text-primary" size={50} />}
      >
        <ViewUserStoryWrapper params={params} />
      </Suspense>
    </div>
  );
}
