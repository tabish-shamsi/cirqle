import checkAuth from "@/data/check-auth";
import Feed from "./feed";
import ProfileSidebar from "./sidebar";
import ProfileHeader from "./top-header";
import { notFound, redirect } from "next/navigation";
import { findAccount } from "@/data/user";

export default async function RenderProfilePage({ username }: { username?: string }) {
  const { username: authUsername } = await checkAuth()

  if (username === authUsername) {
    redirect("/profile")
  }

  const user = await findAccount(username ? username : authUsername)
  if (!user) return notFound()

  return (
    <div className="flex flex-col lg:flex-row flex-wrap mb-4">
      <ProfileHeader />
      <ProfileSidebar userId={user._id.toString()} />
      <Feed />
    </div>
  );
}
