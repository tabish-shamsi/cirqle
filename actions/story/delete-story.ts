"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import imagekit from "@/lib/imagekit";
import Media from "@/models/Media";
import Story from "@/models/Story";
import { revalidatePath } from "next/cache";

export default async function deleteStory({
  storyId,
  mediaId,
}: {
  storyId: string;
  mediaId: string;
}) {
  try {
    const { id } = await checkAuth();
    await db();

    const media = await Media.findById(mediaId);

    if (!media) return { error: "Media not found" };
    if (media.authorId.toString() !== id) {
      return { error: "Unautherized" };
    }

    await imagekit.files.delete(media.fileId);

    await Media.findByIdAndDelete(mediaId);
    await Story.findByIdAndDelete(storyId);

    revalidatePath("/")
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong while deleting story" };
  }
}
