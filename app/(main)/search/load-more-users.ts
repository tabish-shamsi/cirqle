"use server";

import { getUsers } from "@/data/user";
import { USERS_LIMIT } from "@/lib/constants";
import toJSON from "@/utils/toJSON";

type Props = {
  count: number;
  search: string;
};

const loadMoreUsers = async ({ count, search }: Props) => {
  const users = getUsers({ search, skip: USERS_LIMIT * count });

  return toJSON(users);
};

export default loadMoreUsers;
