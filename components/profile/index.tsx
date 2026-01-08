import Feed from "./feed";
import ProfileSidebar from "./sidebar";
import ProfileHeader from "./top-header";

export default function RenderProfilePage() {
  return (
    <div className="flex flex-col lg:flex-row flex-wrap mb-4">
      <ProfileHeader />
      <ProfileSidebar />
      <Feed />
    </div>
  );
}
