import { getSession } from "@/lib/next-auth-options";

interface IUser {
  name: string;
  username: string;
  avatar: string;
  email: string;
  id: string;
  isVerified: boolean;
}

const checkAuth = async () => {
  const session = await getSession();
  if (!session || !session.user) throw new Error("Unauthenticated User");

  return session.user as IUser;
};

export default checkAuth;
