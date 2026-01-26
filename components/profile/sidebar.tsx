import AboutCard from "./about-card";
import FriendsCard from "./friends-card";

export default function ProfileSidebar({ username }: { username: string }) {
  return (
    <div className="w-full lg:w-1/3 space-y-4 pt-4">
      <AboutCard username={username} />
      <FriendsCard />
    </div>
  );
}
