/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../lib/auth";
import prisma from '../../../../../lib/prisma'
import { headers } from "next/headers";

// URL of your deployed FastAPI backend on Azure
const FASTAPI_URL = process.env.FASTAPI_URL;

export const POST = async (req: NextRequest) => {
    if (!FASTAPI_URL) {
        return NextResponse.json(
            { error: "FASTAPI_URL is not set in the environment variables." },
            { status: 500 }
        );
    }
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

        // Prepare the FormData to send to FastAPI
        const fastapiFormData = new FormData();
        fastapiFormData.append("job_description", jobDescription);
        fastapiFormData.append("cv", cvFile);

        // Send the request to the FastAPI backend on Azure
        const fastapiResponse = await fetch(FASTAPI_URL, {
            method: "POST",
            body: fastapiFormData,
        });

        // Create new record
        const newInterview = await prisma.interview.create({
            data: {
                ipAddress: (await headers()).get("x-forwarded-for"),
                status: fastapiResponse.status.toString(),
                content: jobDescription.trim().slice(0, 200),
                userId: userId,
            },
        })

        // Check if the request was successful
        if (!fastapiResponse.ok) {
            const errorText = await fastapiResponse.text();
            return NextResponse.json(
                { error: "FastAPI Error", message: errorText },
                { status: fastapiResponse.status }
            );
        }

        // Parse FastAPI's response
        const responseData = await fastapiResponse.json();

        // Return the AI response.
        return NextResponse.json(
            { response: responseData },
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
