/* eslint-disable prettier/prettier */
import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../../../../lib/auth'
import { headers } from 'next/headers'

export const POST = async (req: NextRequest) => {
    // Get the user session
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Extract authenticated user ID
    const userId = session.user?.id

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        // Parse request body
        let formData
        try {
            formData = await req.formData()
        } catch (error) {
            console.error('Error parsing form data:', error)
            return new NextResponse(
                JSON.stringify({ message: 'Invalid form data' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        // Extract values from FormData
        const mentorshipStr = formData.get('mentorship')
        const mentorshipId = mentorshipStr ? parseInt(mentorshipStr as string, 10) : NaN
        const sender = formData.get('sender') as string
        const receiver = formData.get('receiver') as string
        const title = formData.get('title') as string
        const message = formData.get('message') as string
        const status = formData.get('status') as string

        // Validate required fields
        if (!mentorshipId || !sender || !receiver || !title || !message) {
            return new NextResponse(
                JSON.stringify({ message: 'Missing required fields' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            )
        }

        if (userId != sender) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
        }

        // Create a new message record using the new schema fields:
        const newMessage = await prisma.message.create({
            data: {
                mentorshipId: mentorshipId,
                senderId: sender,
                receiverId: receiver,
                ipAddress: (await headers()).get('x-forwarded-for') || null,
                title: title,
                message: message,
            },
        })

        // If the status field submitted is "true", update the mentorship record to set its status to ONGOING
        if (status === "true") {
            await prisma.mentorship.update({
                where: { id: mentorshipId },
                data: { status: "ONGOING" },
            })
        }

        return new NextResponse(
            JSON.stringify({
                message: 'Message sent successfully.',
                data: {
                    id: newMessage.id,
                    title: newMessage.title,
                    createdAt: newMessage.createdAt,
                },
            }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        )
    }
}
