"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Media from "@/models/Media";
import Story from "@/models/Story";
import User from "@/models/User";

export default async function createStory(mediaId: string) {
  try {
    const { id } = await checkAuth();
    await db();

    const media = await Media.findById(mediaId);
    if (!media) return { error: "Media not found" };

    const story = await Story.create({
      author: id,
      media: mediaId,
    });

    media.isUsed = true;
    await media.save();

    await User.findByIdAndUpdate(id, { $push: { stories: story._id } });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while creating story" };
  }
}
