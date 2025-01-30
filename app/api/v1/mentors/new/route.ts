/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import prisma from "../../../../../lib/prisma";
import { headers } from "next/headers";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdir } from "fs/promises";

// Define a helper function to handle file uploads
const saveFile = async (file: File) => {
    const uploadDir = path.join(process.cwd(), "public/uploads/mentors");

    // Ensure the directory exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    const buffer = await file.arrayBuffer();

    await writeFile(filePath, Buffer.from(buffer));

    return `/uploads/mentors/${file.name}`; // Return the relative URL
};

export const POST = async (req: NextRequest) => {
    // Get the user session
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 } // Unauthorized
        );
    }
    // Extract user ID (assuming the session stores it)
    const user_id = session.user?.id;

    if (!user_id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 } // Unauthorized
        );
    }

    try {
        const formData = await req.formData();

        // Extract form fields
        const userId = user_id as string;
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const title = formData.get("title") as string;
        const linkedin = formData.get("linkedin") as string;
        const description = formData.get("description") as string;
        const expertise = formData.get("expertise") as string;
        const profImage = formData.get("profileImage") as File | null;
        const profileImageUrl = formData.get("profileImageUrl") as string | null;

        // Validate required fields
        if (!userId || !fullName || !email || !title || !linkedin || !description || !expertise) {
            return new NextResponse(
                JSON.stringify({ message: "Missing required fields" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // 🔹 Check if the user is already registered as a mentor
        const existingMentor = await prisma.mentor.findUnique({
            where: { userId },
        });

        if (existingMentor) {
            return new NextResponse(
                JSON.stringify({ message: "User is already registered as a mentor." }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

        let profileImage: string | null = null;

        // Handle file upload OR use existing image URL
        if (profImage instanceof File) {
            profileImage = await saveFile(profImage);
        } else if (profileImageUrl) {
            profileImage = profileImageUrl; // Use the existing image URL
        }

        const expertiseArray = JSON.parse(expertise); // Convert from JSON string to array

        if (!Array.isArray(expertiseArray)) {
            return new NextResponse(
                JSON.stringify({ message: "Expertise must be an array" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Convert array to a comma-separated string
        const expertiseString = expertiseArray.join(", ");

        // Save mentor details in the database
        const newMentor = await prisma.mentor.create({
            data: {
                userId,
                fullName,
                email,
                title,
                linkedin,
                description,
                expertise: expertiseString,
                profileImage: profileImage ? profileImage : profileImageUrl, // Save image URL
                ipAddress: (await headers()).get("x-forwarded-for"),
            },
        });

        const addedMentor = {
            name: newMentor.fullName,
            title: newMentor.title,
            createdAt: newMentor.createdAt,
        }

        // Return the saved mentor details
        return new NextResponse(
            JSON.stringify({ message: "Your mentorship profile has been successfully saved.", mentor: addedMentor }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Internal Server Error:", error.message);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};