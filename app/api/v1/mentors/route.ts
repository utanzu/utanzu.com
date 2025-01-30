/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export const GET = async (req: NextRequest) => {
    try {
        // Parse query parameters for pagination and filtering
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1", 10);
        const limit = parseInt(searchParams.get("limit") || "10", 10);
        const expertiseFilter = searchParams.get("expertise");

        // Ensure pagination values are valid
        const validPage = Math.max(1, page);
        const validLimit = Math.min(Math.max(1, limit), 50); // Limit max results per request

        // Construct query filters
        const whereClause: any = {};
        if (expertiseFilter) {
            whereClause.expertise = {
                contains: expertiseFilter,
                mode: "insensitive", // Case-insensitive filtering
            };
        }

        // Fetch mentors with pagination and filtering
        const mentors = await prisma.mentor.findMany({
            where: whereClause,
            select: {
                id: true,
                userId: true,
                fullName: true,
                title: true,
                linkedin: true,
                description: true,
                expertise: true,
                profileImage: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            skip: (validPage - 1) * validLimit,
            take: validLimit,
        });

        // Get total count for pagination
        const totalMentors = await prisma.mentor.count({ where: whereClause });

        return new NextResponse(
            JSON.stringify({
                success: true,
                mentors,
                pagination: {
                    currentPage: validPage,
                    totalPages: Math.ceil(totalMentors / validLimit),
                    totalMentors,
                    perPage: validLimit,
                },
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error fetching mentors:", error);
        return new NextResponse(
            JSON.stringify({ success: false, message: "Internal Server Error" }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};

