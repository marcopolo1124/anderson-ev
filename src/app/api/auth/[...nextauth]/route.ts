import { authOptions } from "@/auth";
import { verifyUser } from "@/lib/db";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth(authOptions as AuthOptions);

export { handler as GET, handler as POST };
