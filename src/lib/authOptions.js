import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { collection, dbConnect } from "./dbConnect";
import { loginUser } from "@/actions/server/auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        if (!user) return null;
        return user;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      const usersCollection = await dbConnect(collection.USERS);

      const isExist = await usersCollection.findOne({
        email: user?.email,
      });

      if (isExist) return true;

      const newUser = {
        provider: account?.provider,
        nidno: null,
        name: user?.name,
        email: user?.email,
        contact: null,
        image: user?.image || null,
        role: "user",
        createdAt: new Date(),
      };

      const result = await usersCollection.insertOne(newUser);
      return result.acknowledged;
    },

    async session({ session, token }) {
      session.user.role = token?.role;
      session.user.email = token?.email;
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        if (account?.provider === "google") {
          const usersCollection = await dbConnect(collection.USERS);
          const dbUser = await usersCollection.findOne({
            email: user?.email,
          });
          token.role = dbUser?.role;
          token.email = dbUser?.email;
        } else {
          token.role = user?.role;
          token.email = user?.email;
        }
      }
      return token;
    },
  },
};
