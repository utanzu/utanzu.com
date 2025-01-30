/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import prisma from "../../../../../lib/prisma";

export const GET = async (req: NextRequest, { params }: { params: { user: string } }) => {
    const userId = params.user;

    // Get the user session
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // Extract session user ID
    const sessionUserId = session.user?.id;

    if (!sessionUserId) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // Allow fetching only their own profile
    if (sessionUserId !== userId) {
        return NextResponse.json(
            { error: "Forbidden: You can only access your own profile." },
            { status: 403 }
        );
    }

    try {
        // Fetch mentor profile by userId
        const mentorProfile = await prisma.mentor.findUnique({
            where: { userId: userId },
            select: {
                id: true,
                fullName: true,
                email: true,
                title: true,
                linkedin: true,
                description: true,
                expertise: true,
                profileImage: true,
                createdAt: true,
            },
        });

        // If the user is not found, return 404
        if (!mentorProfile) {
            return NextResponse.json(
                { error: "Mentor profile not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { mentor: mentorProfile },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching mentor profile:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};
