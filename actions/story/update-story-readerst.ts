"use server";

import checkAuth from "@/data/check-auth";
import db from "@/lib/db";
import Story from "@/models/Story";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";

export default async function updateStoryReaders(storyId: string) {
  try {
    const { id } = await checkAuth();
    const userId = await new mongoose.Types.ObjectId(id);
    await db();

    const story = await Story.findById(storyId).select("readers");

    if (!story) return { error: "Story not found" };

    if (!story.readers.includes(userId)) {
      story.readers.push(id);
      await story.save();
    }

    revalidatePath("/")
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Unexpected Error occurred" };
  }
}
