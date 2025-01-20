/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    // Ensure the Prisma Client is not recreated during hot reloading in development
    if (!(global as any).prisma) {
        ; (global as any).prisma = new PrismaClient()
    }
    prisma = (global as any).prisma
}

export default prisma
