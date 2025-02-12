/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { headers } from "next/headers";
import { Prisma } from '@prisma/client'

export const POST = async (req: NextRequest) => {
    // Get the user session
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // Extract authenticated user ID
    const userId = session.user?.id;

    if (!userId) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        // Parse request body
        let formData;
        try {
            formData = await req.formData();
        } catch (error) {
            console.error('Error parsing form data:', error);
            return new NextResponse(
                JSON.stringify({ message: 'Invalid form data' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Extract values from FormData
        const mentor = formData.get("mentor") as string;
        const title = formData.get("title") as string;
        const requestMessage = formData.get("request") as string;

        // Validate required fields
        if (!mentor || !title || !requestMessage) {
            return new NextResponse(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Check if the mentorship connection already exists
        const existingMentorship = await prisma.mentorship.findFirst({
            where: {
                mentorId: mentor,
                menteeId: userId,
            },
        });

        if (existingMentorship) {
            return NextResponse.json(
                { message: 'You are already connected with this mentor.' },
                { status: 200 }
            );
        }

        // Create new mentorship connection
        const newMentorship = await prisma.mentorship.create({
            data: {
                mentorId: mentor,
                menteeId: userId,
                ipAddress: (await headers()).get("x-forwarded-for"),
                title,
                message: requestMessage,
            },
        });

        return new NextResponse(
            JSON.stringify({
                message: 'Mentorship connection created successfully.',
                mentorship: {
                    id: newMentorship.id,
                    mentor: newMentorship.title,
                    createdAt: newMentorship.createdAt,
                },
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        // Handle unique constraint error (P2002)
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json(
                { message: 'You have already requested mentorship from this mentor.' },
                { status: 200 }
            );
        }

        //console.error('Internal Server Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: (error as Error).message },
            { status: 500 }
        );
    }
};
