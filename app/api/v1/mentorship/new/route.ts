/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { headers } from "next/headers";

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
        let requestBody;
        try {
            requestBody = await req.json();
        } catch (error) {
            console.error('Error parsing request body:', error);
            return new NextResponse(
                JSON.stringify({ message: 'Invalid request body' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Validate required fields
        const { mentor, title, request } = requestBody;
        if (!mentor || !title || !request) {
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
                message: request,
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
    } catch (error: any) {
        // Handle unique constraint error (P2002)
        if (error.code === 'P2002') {
            return NextResponse.json(
                { message: 'You have already requested mentorship from this mentor.' },
                { status: 200 }
            );
        }

        console.error('Internal Server Error:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
};
