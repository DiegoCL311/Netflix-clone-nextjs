import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prismadb from "@/lib/prismadb";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });

        if (!user?.hashedPassword) {
          throw new Error("Invalid email");
        }

        const isValid = await bcrypt.compare(credentials.password, user.hashedPassword);
        console.log("2", isValid);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string | "",
      clientSecret: process.env.GITHUB_SECRET as string | "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string | "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string | "",
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: true,
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
