/* eslint-disable prettier/prettier */
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getServerSession } from 'next-auth/next'
import { type NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { generateFromEmail, generateUsername } from 'unique-username-generator'
import prisma from './prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET as string

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 3600, // 1 hour
    },
    secret: JWT_SECRET,
    pages: {
        // signIn: '/auth/signin',  // Displays signin buttons
        // signOut: '/auth/signout', // Displays form with sign out button
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string
                session.user.name = token.name ?? ''
                session.user.image = token.image ?? ''
                session.user.username = token.username ?? ''
                session.user.email = token.email as string
                session.user.role = token.role ?? ''
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                // Check if the user has a username
                let existingUser = user.email
                    ? await prisma.user.findUnique({ where: { email: user.email } })
                    : null;

                if (!existingUser) {
                    // Check if the user has a username
                    existingUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            username: generateFromEmail(user.email as string, 3) || `user_${Date.now()}`,
                        },
                    });
                } else if (!existingUser.username) {
                    // If user exists but has no username, update it
                    existingUser = await prisma.user.update({
                        where: { email: user.email as string },
                        data: { username: generateFromEmail(user.email as string, 3) || `user_${Date.now()}` },
                    });
                }

                token.id = existingUser.id as string;
                token.username = existingUser.username ?? '';
                token.name = existingUser.name ?? '';
                token.image = existingUser.image ?? '';
                token.email = existingUser.email ?? '';
                token.role = existingUser.role?.toString() ?? 'user';
            }
            return token
        },
    },
}

export const getServerAuthSession = () => getServerSession(authOptions)
