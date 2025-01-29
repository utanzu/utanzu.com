/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { headers } from "next/headers";
import { writeFile } from "fs/promises";
import path from "path";
import { mkdir } from "fs/promises";

// Define a helper function to handle file uploads
const saveFile = async (file: File, id: string) => {
    const uploadDir = path.join(process.cwd(), "public/uploads/mentors");

    // Ensure the directory exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    const buffer = await file.arrayBuffer();

    await writeFile(filePath, Buffer.from(buffer));

    return `/uploads/mentors/${id}`; // Return the relative URL
};

export const POST = async (req: NextRequest) => {
    try {
        const formData = await req.formData();

        // Extract form fields
        const userId = formData.get("id") as string;
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const title = formData.get("title") as string;
        const linkedin = formData.get("linkedin") as string;
        const description = formData.get("description") as string;
        const expertise = formData.get("expertise") as string;
        const profImage = formData.get("profileImage") as File | null;

        // Validate required fields
        if (!fullName || !email || !title || !linkedin || !description || !expertise) {
            return new NextResponse(
                JSON.stringify({ message: "Missing required fields" }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        let profileImage = null;

        // Handle file upload if provided
        if (profImage) {
            profileImage = await saveFile(profImage, userId);
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
                profileImage, // Save image URL
                ipAddress: (await headers()).get("x-forwarded-for"),
            },
        });

        // Return the saved mentor details
        return new NextResponse(
            JSON.stringify({ message: "Mentor successfully saved.", mentor: newMentor }),
            { status: 201, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        console.error("Internal Server Error:", error.message);
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};