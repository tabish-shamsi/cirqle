import User from "@/models/User";
import db from "./db";
import bcrypt from "bcryptjs";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Empty required fields");
        }

        await db();
        const user = await User.findOne({
          email: credentials.email,
        }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isPasswordValid = await user.comparePassword(
          credentials.password,
        );

        if (!user || !isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          isVerified: user.isVerified,
        };
      },
    }),
  ],
  pages: {
    signIn: "/account/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.username = user.username
        token.email = user.email;
        token.avatar = user.avatar;
        token.isVerified = user.isVerified;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.username = token.username
        session.user.email = token.email;
        session.user.avatar = token.avatar;
        session.user.isVerified = token.isVerified;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}

export default authOptions;
