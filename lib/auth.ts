/* eslint-disable prettier/prettier */
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getServerSession, type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { uniqueUsernameGenerator, Config, adjectives, nouns } from 'unique-username-generator'
import prisma from './prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET as string

const config: Config = {
    dictionaries: [adjectives, nouns],
}

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
                session.user.id = token.id ?? ''
                session.user.name = token.name ?? ''
                session.user.image = token.image ?? ''
                session.user.username = token.username ?? ''
                session.user.email = token.email ?? ''
                session.user.role = token.role ?? ''
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                // Check if the user has a username
                let existingUser = await prisma.user.findUnique({ where: { id: user.id } })

                if (existingUser && !existingUser.username) {
                    // Generate a random username
                    const randomUsername: string = uniqueUsernameGenerator(config)

                    // Save the username to the user
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { username: randomUsername },
                    })

                    token.username = randomUsername
                } else {
                    token.username = existingUser.username
                }

                token.id = user.id
                token.name = user.name
                token.image = user.image
                token.email = user.email
                token.role = user.role
            }
            return token
        },
    },
}

export const getServerAuthSession = () => getServerSession(authOptions)
