/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../../lib/auth";
import prisma from "../../../../../../lib/prisma";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ user: string }> }) => {
    const user = (await params).user
    try {
        // Parallel execution: Get user session & mentors
        const [session, myMentors] = await Promise.all([
            getServerSession(authOptions),
            prisma.mentorship.findMany({
                where: { menteeId: user },
                select: {
                    id: true,
                    mentorId: true,
                    title: true,
                    status: true,
                    createdAt: true,
                },
            }),
        ]);

        // Validate session
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Restrict access to only their own mentors
        if (session.user.id !== user) {
            return NextResponse.json(
                { error: "Forbidden: You can only access your own data." },
                { status: 403 }
            );
        }

        // Return mentors (empty array if none found)
        return NextResponse.json(
            { mentors: myMentors },
            { status: 200 }
        );

    } catch (error) {
        //console.error("Error fetching mentor profile:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
};
