import RenderProfilePage from "@/components/profile"; 

export default async function UserProfile({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  return <RenderProfilePage username={username} />
}
