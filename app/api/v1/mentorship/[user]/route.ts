/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import prisma from "../../../../../lib/prisma";

export const GET = async (req: NextRequest, { params }: { params: { user: string } }) => {
    try {
        // Authenticate user
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Extract session user ID
        const sessionUserId = session.user?.id;

        // Restrict access to only their own mentorship connections
        const requestedUserId = params.user;
        if (sessionUserId !== requestedUserId) {
            return NextResponse.json({ error: "Forbidden: You can only access your own data." }, { status: 403 });
        }

        // Fetch mentorships where the user is a mentor or mentee
        const mentorships = await prisma.mentorship.findMany({
            where: {
                OR: [{ mentorId: requestedUserId }, { menteeId: requestedUserId }],
            },
            select: {
                id: true,
                mentorId: true,
                menteeId: true,
                status: true,
                title: true,
                message: true,
                createdAt: true,
                updatedAt: true,
                mentor: {
                    select: {
                        id: true,
                        userId: true,
                        fullName: true,
                        profileImage: true,
                        title: true,
                    },
                },
                mentee: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Separate active and past mentorships
        const activeMentorships = mentorships.filter((m) => m.status === "ONGOING" || m.status === "PENDING");
        const pastMentorships = mentorships.filter((m) => m.status === "COMPLETED" || m.status === "REJECTED");

        return NextResponse.json(
            { active: activeMentorships, past: pastMentorships },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching mentorships:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};