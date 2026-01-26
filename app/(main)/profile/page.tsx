import RenderProfilePage from "@/components/profile";
import checkAuth from "@/data/check-auth";

export default async function Profile() {
  const { username } = await checkAuth()
  
  return <RenderProfilePage username={username} />
}