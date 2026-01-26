import { notFound } from "next/navigation";
import Feed from "./feed";
import ProfileSidebar from "./sidebar";
import ProfileHeader from "./top-header";

export default async function RenderProfilePage({ username }: { username: string }) {
  if (!username) return notFound()

  return (
    <div className="flex flex-col lg:flex-row flex-wrap mb-4">
      <ProfileHeader />
      <ProfileSidebar username={username} />
      <Feed />
    </div>
  );
}
