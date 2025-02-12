/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server'

import prisma from '../../../../../lib/prisma'

export const GET = async (req: NextRequest, { params }: { params: Promise<{ user: string }> }) => {
    // const { user: userId } = await params;
    const user = (await params).user
    try {
        const courses = await prisma.course.findMany({
            select: {
                id: true,
                title: true,
                topic: true,
                subtopic: true,
                userId: true,
                createdAt: true,
            },
            where: {
                userId: user,
            },
            orderBy: { createdAt: 'desc' },
        })
        return new NextResponse(JSON.stringify(courses), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        //console.error('Error fetching courses:', error)
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}
