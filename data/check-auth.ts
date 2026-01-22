import { getSession } from "@/lib/next-auth-options";
import { User } from "next-auth";

const checkAuth = async () => {
  const session = await getSession();
  if (!session || !session.user) throw new Error("Unauthenticated User");

  return session.user as User;
};
export default checkAuth;
