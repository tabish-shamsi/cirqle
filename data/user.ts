import db from "@/lib/db";
import User from "@/models/User";
import "@/models/Media";
import "server-only";
import checkAuth from "./check-auth";
import { EMAIL_CHANGE_RESET_WINDOW, USERS_LIMIT } from "@/lib/constants";
import Profile from "@/models/Profile";
import IProfile from "@/types/Profile";
import { toDateString } from "@/utils/formatDate";
import toJSON from "@/utils/toJSON";

export const findAccount = async (identifier: string) => {
  if (!identifier) return null;

  await db();

  const user = await User.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  }).select("name email avatar");

  if (!user) return null;

  return JSON.parse(JSON.stringify(user));
};

// settings/password
export const checkAllowChangePassword = async () => {
  const { id } = await checkAuth();
  try {
    await db();
    const user = await User.findById(id);
    if (!user) return null;

    return user.allowChangePassword;
  } catch (error: any) {
    throw new Error(error);
  }
};

// settings/change-email
export async function getEmailChangeInfo() {
  const { id } = await checkAuth();
  await db();

  const user = await User.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  const now = Date.now();
  const lastChangeTime = user.lastEmailChange?.getTime() ?? null;

  let canChangeEmail = true;
  let remainingMs = 0;

  if (lastChangeTime) {
    const timeSinceLastChange = now - lastChangeTime;

    if (timeSinceLastChange < EMAIL_CHANGE_RESET_WINDOW) {
      canChangeEmail = false;
      remainingMs = EMAIL_CHANGE_RESET_WINDOW - timeSinceLastChange;
    }
  }

  return {
    email: user.email,
    canChangeEmail,
    remainingMs,
    lastEmailChange: user.lastEmailChange,
    allowChange: user.allowChangeEmail,
  };
}

// settings/account-information
export async function getAccountInformation() {
  await db();
  const { id } = await checkAuth();
  const user = await User.findById(id).select("name username birthday");

  if (!user) throw new Error("User not found");

  const profile = await Profile.findOne({ userId: user._id });

  const accountInformation = {
    firstName: user.name.split(" ")[0],
    lastName: user.name.split(" ").slice(1).join(" "),
    username: user.username,
    birthday: user.birthday,
    hometown: profile?.hometown ?? "",
    current_city: profile?.current_city ?? "",
    profession: profile?.profession ?? "",
    bio: profile?.bio ?? "",
  };

  return accountInformation;
}

// settings/socials
export async function getSocialsObject() {
  const { id } = await checkAuth();

  await db();
  const profile = (await Profile.findOne({ userId: id })) as IProfile;
  if (!profile || !profile.socials || profile.socials.length <= 0)
    return {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      linkedin: "",
      tiktok: "",
    };

  const socialsObj = profile.socials.reduce(
    (acc: Record<string, string>, item) => {
      acc[item.platform.toLowerCase()] = item.url;
      return acc;
    },
    {} as Record<string, string>,
  );

  return socialsObj;
}

export async function getAboutDetails(userId: string) {
  await checkAuth();

  await db();

  const user = await User.findById(userId).select("birthday createdAt");

  if (!user) throw new Error("User not found");

  const profile = (await Profile.findOne({ userId: user._id })) as IProfile;

  const about = {
    bio: profile?.bio ?? "",
    "current city": profile?.current_city ?? "",
    hometown: profile?.hometown ?? "",
    profession: profile?.profession ?? "",
    birthday: toDateString(user.birthday),
    joined: toDateString(user.createdAt),
  };

  return about;
}

export async function getSocials(userId: string) {
  await checkAuth();

  await db();

  const profile = (await Profile.findOne({ userId })) as IProfile;
  if (!profile || !profile.socials) return [];

  // to remove those that are empty
  const socials = profile?.socials.filter((value) => {
    if (value.url.length > 0) {
      return value;
    }
  });

  return socials;
}

export async function getProfileHeader(userId: string) {
  await checkAuth();
  await db();

  const profile = await Profile.findOne({ userId })
    .select("cover")
    .populate("cover")
    .exec();
  const user = await User.findById(userId)
    .select("name username avatar")
    .populate("avatar")
    .exec();

  if (!user) throw new Error("User not found");
  const profileData = JSON.parse(
    JSON.stringify({
      avatar: user.avatar,
      cover: profile?.cover,
      name: user.name,
      username: user.username,
    }),
  );
  return profileData;
}
``;

export async function getUsers({
  search,
  skip = 0,
}: {
  search: string;
  skip?: number;
}) {
  await checkAuth();
  await db();

  const regex = new RegExp(search, "i");
  const match = {
    $or: [{ name: regex }, { username: regex }],
  };

  const users = await User.find(match)
    .select("name username avatar")
    .populate({ path: "avatar", select: "url" })
    .limit(USERS_LIMIT)
    .skip(skip);

  return toJSON(users);
}
