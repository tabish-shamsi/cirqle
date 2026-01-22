"use server";

import db from "@/lib/db";
import User from "@/models/User";
import { TRegisterSchema } from "@/schemas/auth-schema";

const registerUser = async (data: TRegisterSchema) => {
  const { name, username, email, password, birthday } = data;

  try {
    await db();

    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    }).select("-password");

    if (userExists) {
      return { error: "An account is already registered with that email" };
    }

    await User.create({
      name,
      username,
      email,
      password,
      birthday,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong" };
  }
};

export default registerUser;
