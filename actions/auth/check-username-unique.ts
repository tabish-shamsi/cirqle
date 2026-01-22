"use server"

import db from "@/lib/db";
import User from "@/models/User";

const checkUsernameUnique = async (username: string) => {
  if (!username) return;

  await db();
  const user = await User.findOne({ username }).select("username").lean();  
  return JSON.parse(JSON.stringify(user))
};
export default checkUsernameUnique;
