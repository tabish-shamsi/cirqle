"use server";

import getPosts from "@/data/post";
import { POSTS_LIMIT } from "@/lib/constants";

export default async function loadMorePosts(
  count: number,
  userId?: string,
  q?: string,
  postType?: "image" | "video",
) {
  return await getPosts({
    skip: count * POSTS_LIMIT,
    userId,
    query: q,
    postType: postType,
  });
}
