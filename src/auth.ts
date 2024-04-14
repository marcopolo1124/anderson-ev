import { verifyUser } from "@/lib/db";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        session: async ({ session, token }: any) => {
            if (session?.user) {
                session.user.id = token.sub;
            }
            return session;
        },
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
    },
    secret: process.env.SESSION_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                try {
                    const res = await verifyUser(email, password);
                    if (res.code == 200) {
                        return {
                            id: res.id,
                            email: `${res.email}`,
                        };
                    } else {
                        return null;
                    }
                } catch (e) {
                    return null;
                }
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
};
