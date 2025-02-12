/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import prisma from "../../../../../lib/prisma";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ user: string }> }) => {
    const user = (await params).user

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

    // Allow fetching only their own messages
    if (sessionUserId !== user) {
        return NextResponse.json(
            { error: "Forbidden: You can only access your own messages." },
            { status: 403 }
        );
    }

    try {
        // Fetch all messages where the user is either the sender or the receiver.
        const userMessages = await prisma.message.findMany({
            where: {
                OR: [{ senderId: user }, { receiverId: user }],
            },
            include: {
                sender: {
                    select: { id: true, name: true, image: true },
                },
                receiver: {
                    select: { id: true, name: true, image: true },
                },
            },
            orderBy: { createdAt: "asc" },
        });

        return NextResponse.json({ messages: userMessages }, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { message: 'Internal Server Error', error: (error as Error).message },
            { status: 500 }
        );
    }
};