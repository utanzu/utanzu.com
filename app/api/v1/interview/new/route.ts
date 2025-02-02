/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import { headers } from "next/headers";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Helper function to save the uploaded CV file.
const saveFile = async (file: File): Promise<string> => {
    const uploadDir = path.join(process.cwd(), "public/uploads/cvs");
    // Ensure the directory exists.
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, file.name);
    const buffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(buffer));
    // Return the relative URL so it can be used later.
    return `/uploads/cvs/${file.name}`;
};

// Dummy AI function to simulate generating interview questions based on the CV and job description.
const generateInterviewQuestions = async (cvUrl: string, jobDescription: string): Promise<string> => {
    // In your real application, call your AI service here (or use an SDK).
    // For simulation, we resolve after a short delay.
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(
                `Based on your CV at ${cvUrl} and the job description "${jobDescription}", here are some interview questions:
1. Can you explain your background and experience as described in your CV?
2. How do your skills match the requirements of this job?
3. What challenges have you faced in your previous roles, and how did you overcome them?`
            );
        }, 2000);
    });
};

export const POST = async (req: NextRequest) => {
    // Get the user session.
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user?.id;
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Parse the incoming form data.
        const formData = await req.formData();

        // Extract the CV file and job description from the form data.
        const cvFile = formData.get("cv");
        const jobDescription = formData.get("job") as string;

        // Validate required fields.
        if (!(cvFile instanceof File)) {
            return NextResponse.json(
                { error: "CV file is missing or invalid." },
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }
        if (!jobDescription) {
            return NextResponse.json(
                { error: "Job description is required." },
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        // Save the uploaded CV file and get its URL.
        const cvUrl = await saveFile(cvFile);

        // Call your AI service (simulated here) to generate interview questions.
        const aiResponse = await generateInterviewQuestions(cvUrl, jobDescription);

        // Return the AI response.
        return NextResponse.json(
            { response: aiResponse },
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json(
            { error: "Internal Server Error", message: error.message },
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
};
