/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../../lib/prisma'

export const GET = async (req: NextRequest, { params }: { params: Promise<{ user: string }> }) => {
    // const { user: userId } = await params;
    const user = (await params).user
    try {
        // Fetch courses for the given user with only title and subtopic
        const courses = await prisma.course.findMany({
            select: {
                title: true,
                subtopic: true,
            },
            where: {
                userId: user,
            },
            orderBy: { createdAt: 'desc' },
        })

        // Group courses by title and count subtopics for each course
        const courseProgress = courses.reduce((acc, course) => {
            // Initialize course if it doesn't exist
            if (!acc[course.title]) {
                acc[course.title] = {
                    title: course.title,
                    subtopicCount: 0,
                    subtopics: new Set(),  // Use Set to avoid duplicate subtopics
                }
            }

            // Add subtopic to the course's set
            acc[course.title].subtopics.add(course.subtopic)
            acc[course.title].subtopicCount = acc[course.title].subtopics.size

            return acc
        }, {} as Record<string, { title: string; subtopicCount: number; subtopics: Set<string> }>)

        // Convert the courseProgress object to an array of courses with subtopic counts
        const result = Object.values(courseProgress).map(course => ({
            title: course.title,
            subtopicCount: course.subtopicCount
        }))

        return new NextResponse(JSON.stringify(result), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('Error fetching courses:', error)
        return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}