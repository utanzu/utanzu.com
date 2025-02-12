/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'
import { headers } from "next/headers";
import { Prisma } from '@prisma/client'

export const POST = async (req: NextRequest) => {
    try {
        let requestBody
        try {
            requestBody = await req.json()
        } catch (parseError) {
            console.error('Error parsing request body:', parseError)
            return new NextResponse(JSON.stringify({ message: 'Invalid request body' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        if (
            !requestBody.topic ||
            !requestBody.subtopic ||
            !requestBody.user
        ) {
            return new NextResponse(JSON.stringify({ message: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            })
        }

        // Check if the subtopic already exists for the same user
        const existingCourse = await prisma.course.findFirst({
            where: {
                subtopic: requestBody.subtopic,
                userId: requestBody.user,
            },
        })

        if (existingCourse) {
            return NextResponse.json(
                { message: 'Subtopic already exists for this user' },
                { status: 200 }
            );
        }

        // Create new post
        const newCourse = await prisma.course.create({
            data: {
                ipAddress: (await headers()).get("x-forwarded-for"),
                title: requestBody.title,
                topic: requestBody.topic,
                subtopic: requestBody.subtopic,
                userId: requestBody.user,
            },
        })

        const addedCourse = {
            id: newCourse.id,
            title: newCourse.title,
            topic: newCourse.topic,
            subtopic: newCourse.subtopic,
            userId: newCourse.userId,
            createdAt: newCourse.createdAt,
        }

        return new NextResponse(
            JSON.stringify({ message: 'Course successfully saved.', course: addedCourse }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        // Handle unique constraint error (P2002)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // Handle unique constraint error (P2002)
            if (error.code === 'P2002') {
                return NextResponse.json(
                    { message: 'Subtopic already exists for this user.' },
                    { status: 200 }
                );
            }
        }

        // console.error('Internal Server Error:', error.message);
        return NextResponse.json(
            { message: 'Internal Server Error', error: (error as Error).message },
            { status: 500 }
        );
    }
}
