import { Suspense } from "react";
import SocialsCardSkeleton from "../skeletons/socials-card-skeleton";
import AboutCard from "./about-card";
import FriendsCard from "./friends-card";
import { SocialsCard } from "./socials-card";
import AboutCardSkeleton from "../skeletons/about-card-skeleton";

export default function ProfileSidebar({ userId }: { userId: string }) {
  return (
    <div className="w-full lg:w-1/3 space-y-4 pt-4">

      <Suspense fallback={<AboutCardSkeleton />}>
        <AboutCard userId={userId} />
      </Suspense>

      <Suspense fallback={<SocialsCardSkeleton />}>
        <SocialsCard userId={userId} />
      </Suspense>

      <FriendsCard />
    </div>
  );
}
