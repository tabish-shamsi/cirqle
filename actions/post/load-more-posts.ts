"use server";

import getPosts from "@/data/post";
import { POSTS_LIMIT } from "@/lib/constants";

export default async function loadMorePosts(count: number, userId?: string) {
  return await getPosts({ skip: count * POSTS_LIMIT, userId });
}
