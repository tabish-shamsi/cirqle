import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    name?: string;
    username?: string;
    avatar?: string;
    email?: string;
    id?: string;
    isVerified?: boolean;
  }

  interface Session {
    user: {
      name?: string;
      avatar?: string;
      username?: string;
      email?: string;
      id?: string;
      isVerified?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      name?: string;
      avatar?: string;
      username?: string;
      email?: string;
      id?: string;
      isVerified?: boolean;
    };
  }
}
