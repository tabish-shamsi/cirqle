import { Suspense } from "react";
import CreatePost from "../posts/create-post"; 
import { PostSkeleton } from "../posts/post-skeleton";
import ProfilePosts from "./profile-posts";

export default function Feed({ userId }: { userId: string }) {
  return (
    <div className="space-y-4 w-full lg:w-2/3 lg:pl-4 pt-4">
      <CreatePost userId={userId} />
      <Suspense fallback={<PostSkeleton />}>
        <ProfilePosts userId={userId} />
      </Suspense>
    </div>
  );
}
