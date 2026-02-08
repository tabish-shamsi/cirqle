import checkAuth from "./check-auth"; 
import Story from "@/models/Story"; 
import mongoose from "mongoose";
import toJSON from "@/utils/toJSON";

export async function getFeedStories() {
  const {id} = await checkAuth()
  const currentUserId = new mongoose.Types.ObjectId(id);

  const pipeline = [
    // 1. Only active stories
    {
      $match: {
        expiresAt: { $gt: new Date() },
      },
    },

    // 2. Lookup author (LIMITED FIELDS)
    {
      $lookup: {
        from: "users",
        let: { authorId: "$author" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$authorId"] },
            },
          },
          {
            $project: {
              name: 1,
              username: 1,
              avatar: 1,
              friends: 1,
            },
          },

          // Avatar media (ONLY url)
          {
            $lookup: {
              from: "media",
              let: { avatarId: "$avatar" },
              pipeline: [
                {
                  $match: {
                    $expr: { $eq: ["$_id", "$$avatarId"] },
                  },
                },
                {
                  $project: {
                    _id: 0,
                    url: 1,
                  },
                },
              ],
              as: "avatar",
            },
          },
          {
            $unwind: {
              path: "$avatar",
              preserveNullAndEmptyArrays: true,
            },
          },
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

    // 4. Story media (ONLY type + url)
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
              _id: 0,
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

    // 5. Read status
    {
      $addFields: {
        isRead: {
          $in: [currentUserId, "$readers"],
        },
      },
    },

    // 6. Sort stories per author
    {
      $sort: {
        createdAt: 1,
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

    // 8. Pick correct story
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
            { $arrayElemAt: ["$unreadStories", -1] }, // latest unread
            { $arrayElemAt: ["$stories", 0] }, // first story
          ],
        },
      },
    },

    // 9. Unread authors first
    {
      $sort: {
        hasUnread: -1,
      },
    },
  ];

  // @ts-ignore
  const stories = await Story.aggregate(pipeline)

  return toJSON(stories)
}
