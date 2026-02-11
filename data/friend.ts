import Friend from "@/models/Friend";
import checkAuth from "./check-auth";
import { FriendType } from "@/types/Friend";
import db from "@/lib/db";
import toJSON from "@/utils/toJSON";
import User from "@/models/User";
import mongoose from "mongoose";

export async function getFriendStatus(userId: string) {
  const { id } = await checkAuth();
  if (userId === id) return null; // it means we are on the /profile page or we are seeing our own profile

  await db();
  const friend = await Friend.findOne({
    $or: [
      { requestor: id, acceptor: userId },
      { requestor: userId, acceptor: id },
    ],
  }).lean();

  if (!friend) return { friendType: "notFriend" as FriendType, friend: null }; // seeing a profile which is not a friend

  let friendType: FriendType;
  if (friend.requestor.toString() === id) {
    friendType = "acceptor"; // the user received the request
  } else {
    friendType = "requestor"; // the user sent the request
  }

  return { friendType, friend: toJSON(friend) };
}

export async function getFriendRequests() {
  const { id } = await checkAuth();
  await db();

  const friend = await Friend.find({
    acceptor: id,
    status: "pending",
  }).populate({
    path: "requestor",
    select: "name username avatar",
    populate: { path: "avatar", select: "url" },
  });

  if (!friend) return [];

  return toJSON(friend);
}

export async function getAcceptedFriends(userId?: string) {
  const { id } = await checkAuth();
  await db();

  const user_id = userId ? userId : id;
  const user = await User.findById(user_id)
    .select("friends")
    .populate({
      path: "friends",
      select: "name username avatar",
      populate: { path: "avatar", select: "url" },
    });

  return toJSON(user.friends);
}

export async function getFriendSuggestions() {
  const { id } = await checkAuth();
  await db();

  const userId = new mongoose.Types.ObjectId(id);
  const suggestions = await User.aggregate([
    // 1️⃣ Match the current user
    {
      $match: { _id: userId },
    },

    // 2️⃣ Get friends
    {
      $project: {
        friends: 1,
      },
    },

    // 3️⃣ Lookup friends of friends
    {
      $lookup: {
        from: "users",
        localField: "friends",
        foreignField: "_id",
        as: "friendsData",
      },
    },

    // 4️⃣ Extract friends-of-friends
    {
      $project: {
        friends: 1,
        friendsOfFriends: {
          $reduce: {
            input: "$friendsData.friends",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
      },
    },

    // 5️⃣ Unwind friends-of-friends
    { $unwind: "$friendsOfFriends" },

    // 6️⃣ Exclude yourself & existing friends
    {
      $match: {
        $expr: {
          $and: [
            { $ne: ["$friendsOfFriends", userId] }, // exclude yourself
            { $not: { $in: ["$friendsOfFriends", "$friends"] } }, // exclude existing friends
          ],
        },
      },
    },

    // 7️⃣ Count mutual friends
    {
      $group: {
        _id: "$friendsOfFriends",
        mutualFriendsCount: { $sum: 1 },
      },
    },

    {
      $lookup: {
        from: "friends",
        let: { suggestedUserId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $or: [
                  {
                    $and: [
                      { $eq: ["$requestor", userId] },
                      { $eq: ["$acceptor", "$$suggestedUserId"] },
                    ],
                  },
                  {
                    $and: [
                      { $eq: ["$requestor", "$$suggestedUserId"] },
                      { $eq: ["$acceptor", userId] },
                    ],
                  },
                ],
              },
            },
          },
        ],
        as: "existingRelation",
      },
    },
    {
      $match: {
        existingRelation: { $size: 0 },
      },
    },

    // 8️⃣ Lookup user info
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },

    // 9️⃣ Lookup avatar (Media)
    {
      $lookup: {
        from: "media",
        localField: "user.avatar",
        foreignField: "_id",
        as: "avatar",
      },
    },
    {
      $unwind: {
        path: "$avatar",
        preserveNullAndEmptyArrays: true,
      },
    },

    // 🔟 Final shape
    {
      $project: {
        _id: "$user._id",
        name: "$user.name",
        username: "$user.username",
        mutualFriends: "$mutualFriendsCount",
        avatar: {
          _id: "$avatar._id",
          url: "$avatar.url",
        },
      },
    },

    // Optional: sort by most mutual friends
    {
      $sort: { mutualFriends: -1 },
    },
    {
      $limit: 5,
    },
  ]);

  return toJSON(suggestions);
}
