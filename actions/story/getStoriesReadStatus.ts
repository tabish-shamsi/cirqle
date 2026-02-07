"use server";

import { storiesReadStatus } from "@/data/story";

export default async function getStoriesReadStatus(userId: string) {
  const status = await storiesReadStatus(userId);
  return status;
}
