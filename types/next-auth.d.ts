/* eslint-disable prettier/prettier */
import 'next-auth/jwt'
import { DefaultSession } from 'next-auth'

declare module 'next-auth/jwt' {
    type JWT = {
        id: string,
        name: string,
        image: string,
        role: number,
        username: string,
        name: string,
        email: string
    }
}

declare module 'next-auth' {
    type Session = {
        user: {
            id: string,
            name: string,
            image: string,
            role: number,
            username: string,
            name: string,
            email: string
        } & DefaultSession['user']
    }

    type User = {
        id: string,
        name: string,
        image: string,
        role: number,
        username: string,
        name: string,
        email: string
    }
}