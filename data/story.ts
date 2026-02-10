import checkAuth from "./check-auth";
import Story from "@/models/Story";
import mongoose from "mongoose";
import toJSON from "@/utils/toJSON";
import db from "@/lib/db";
import User from "@/models/User";
import { notFound } from "next/navigation";

export async function getFeedStories() {
  const { id } = await checkAuth();
  await db();
  const currentUserId = new mongoose.Types.ObjectId(id);

  const pipeline = [
  // 1. Only active stories
  {
    $match: {
      expiresAt: { $gt: new Date() },
    },
  },

  // 2. Lookup author with limited fields
  {
    $lookup: {
      from: "users",
      let: { authorId: "$author" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$authorId"] } } },
        { $project: { name: 1, username: 1, avatar: 1, friends: 1 } },
        // populate avatar
        {
          $lookup: {
            from: "media",
            let: { avatarId: "$avatar" },
            pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$avatarId"] } } }, { $project: { _id: 0, url: 1 } }],
            as: "avatar",
          },
        },
        { $unwind: { path: "$avatar", preserveNullAndEmptyArrays: true } },
      ],
      as: "author",
    },
  },
  { $unwind: "$author" },

  // 3. Only current user + friends
  {
    $match: {
      $or: [
        { "author._id": currentUserId },
        { "author.friends": currentUserId },
      ],
    },
  },

  // 4. Story media
  {
    $lookup: {
      from: "media",
      let: { mediaId: "$media" },
      pipeline: [
        { $match: { $expr: { $eq: ["$_id", "$$mediaId"] } } },
        { $project: { _id: 0, type: 1, url: 1 } },
      ],
      as: "media",
    },
  },
  { $unwind: { path: "$media", preserveNullAndEmptyArrays: true } },

  // 5. Read status
  {
    $addFields: {
      isRead: { $in: [currentUserId, "$readers"] },
    },
  },

  // 6. Sort stories **latest first**
  {
    $sort: {
      createdAt: -1, // latest story first
    },
  },

  // 7. Group by author
  {
    $group: {
      _id: "$author._id",
      author: { $first: "$author" },
      stories: {
        $push: {
          _id: "$_id",
          media: "$media",
          createdAt: "$createdAt",
          isRead: "$isRead",
        },
      },
      unreadStories: {
        $push: {
          $cond: [
            { $eq: ["$isRead", false] },
            {
              _id: "$_id",
              media: "$media",
              createdAt: "$createdAt",
            },
            "$$REMOVE",
          ],
        },
      },
    },
  },

  // 8. Pick latest unread story, else latest story
  {
    $project: {
      author: {
        _id: "$author._id",
        name: "$author.name",
        username: "$author.username",
        avatar: "$author.avatar.url",
      },
      hasUnread: { $gt: [{ $size: "$unreadStories" }, 0] },
      story: {
        $cond: [
          { $gt: [{ $size: "$unreadStories" }, 0] },
          { $arrayElemAt: ["$unreadStories", 0] }, // latest unread
          { $arrayElemAt: ["$stories", 0] }, // latest story
        ],
      },
    },
  },

  // 9. Sort authors: current user first, then unread authors
  {
    $addFields: {
      isCurrentUser: { $eq: ["$author._id", currentUserId] },
    },
  },
  {
    $sort: {
      isCurrentUser: -1, // current user first
      hasUnread: -1,     // then unread authors
    },
  },
];


  // @ts-ignore
  const stories = await Story.aggregate(pipeline);

  return toJSON(stories);
}

export async function getUserStory({ username }: { username: string }) {
  const { id } = await checkAuth();
  await db();

  const user = await User.findOne({ username })
    .select("avatar name username")
    .populate({ path: "avatar", select: "url" });

  if (!user) return notFound();

  const stories = await Story.aggregate([
    {
      $match: {
        author: user._id,
        expiresAt: { $gt: new Date() },
      },
    },

    // Populate media (type + url)
    {
      $lookup: {
        from: "media",
        let: { mediaId: "$media" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$mediaId"] },
            },
          },
          {
            $project: {
              _id: 1,
              type: 1,
              url: 1,
            },
          },
        ],
        as: "media",
      },
    },
    {
      $unwind: {
        path: "$media",
        preserveNullAndEmptyArrays: true,
      },
    },

    // Read status
    {
      $addFields: {
        isRead: {
          $in: [new mongoose.Types.ObjectId(id), "$readers"],
        },
      },
    },

    // Order stories
    {
      $sort: {
        createdAt: -1,
      },
    },

    // Trim fields
    {
      $project: {
        _id: 1,
        media: 1,
        createdAt: 1,
        isRead: 1,
      },
    },
  ]);

  return {
    author: toJSON(user),
    stories: toJSON(stories), 
  };
}  