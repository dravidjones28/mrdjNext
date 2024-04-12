import User from "@/app/models/User";
import { Adapter } from "next-auth/adapters";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { AuthOptions, NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/app/libs/mongodb";

const adapterInstance = MongoDBAdapter(clientPromise);

export const authOptions: NextAuthOptions = {
  providers: [
    // When you sign in
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials, request) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await User.findOne({ email: credentials.email });

        if (!user) return null;

        const passwordMatched = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log(passwordMatched);

        return passwordMatched ? user : null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: adapterInstance as Adapter,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth",
  },
};
