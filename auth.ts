import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import authConfig from '@/auth.config'
import { db } from "./lib/db"
import { getUserById } from "./data/user"

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        },
        //pode adicionar eventos aqui.
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log({
                user, account
            })

            if (account?.provider !== "credentials") return true;

            const existUser = await getUserById(user.id as string);
            if (!existUser?.emailVerified) return false;

            return true;
        },
        async session({ token, session }) {
            console.log({ sessionToken: token });
            if (token.sub && session.user) {
                session.user.id = token.sub
            }

            if (token.role && session.user) {
                session.user.role = token.role;
            }

            console.log({
                sessionToken: token,
                session
            })
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existUser = await getUserById(token.sub);
            if (!existUser) return token;

            token.role = existUser.role;

            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})