import db from "@/lib/db";
import checkAuth from "./check-auth";
import User from "@/models/User";
import Story from "@/models/Story";
import IStory from "@/types/Story";
import mongoose from "mongoose";
import toJSON from "@/utils/toJSON";

export async function getStories() {
  const { id } = await checkAuth();
  await db();

  let stories: IStory[] = [];

  const userStory = await Story.findOne({ author: id })
    .populate({
      path: "media",
      select: "type url",
    })
    .populate({
      path: "author",
      select: "name avatar",
      populate: {
        path: "avatar",
        select: "url",
      },
    })
    .sort({ createdAt: -1 });

  if (userStory) stories.push(userStory);

  const user = await User.findById(id).select("friends");
  if (!user.friends || user.friends.length === 0) {
    return stories;
  }

  await Promise.all(
    user.friends.map(async (friend: mongoose.Types.ObjectId) => {
      const story = await Story.findOne({ author: friend })
        .populate({
          path: "media",
          select: "type url",
        })
        .populate({
          path: "author",
          select: "name avatar",
          populate: {
            path: "avatar",
            select: "url",
          },
        })
        .sort({ createdAt: -1 });

      if (story) stories.push(story);
    }),
  );

  return toJSON(stories);
}

export async function storiesReadStatus(userId: string) {
  const { id } = await checkAuth();
  await db();

  const stories = await Story.findOne({ author: userId }).select("readers")
  if (!stories.readers || stories.readers.length === 0) {
    return false;
  }

  let isRead: boolean = false;

  stories.readers.map((r: mongoose.Types.ObjectId) => {
    if (r.toString() === id) isRead = true
  });

  return isRead
}
