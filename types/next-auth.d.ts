/* eslint-disable prettier/prettier */
import 'next-auth'
import 'next-auth/jwt'
import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: DefaultUser & {
            id: string
            username: string
            role: string // Change to 'number' if roles are stored as numbers
        }
    }

    interface User {
        id: string
        username: string
        role: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id: string
        username: string
        role: string
        image?: string
    }
}
