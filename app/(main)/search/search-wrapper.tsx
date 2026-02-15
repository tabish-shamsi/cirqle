import { notFound } from "next/navigation";
import PostsWrapper from "./posts-wrapper";
import VideosWrapper from "./videos-wrapper";
import UsersWrapper from "./users-wrapper";

export default async function SearchWrapper({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    posts: string;
    people: string;
    videos: string;
  }>;
}) {
  const { q, posts, people, videos } = await searchParams;

  if (q && posts && people && videos) return notFound();

  if (posts) {
    return <PostsWrapper q={q} />;
  } else if (videos) {
    return <VideosWrapper q={q} />;
  } else if (people) {
    return <UsersWrapper q={q} />
  }
}
