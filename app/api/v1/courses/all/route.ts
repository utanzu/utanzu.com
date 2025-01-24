import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export const GET = async (req: NextRequest) => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                company: true,
                companyImage: true,
                cityCountry: true,
                model: true,
                experience: true,
                educationCerts: true,
                skills: true,
                steps: true,
                stepsDetails: true,
                experienceRating: true,
                offerGiven: true,
                baseSalaryCurrency: true,
                baseSalary: true,
                bonusCurrency: true,
                bonus: true,
                otherBenefits: true,
                offerTaken: true,
                reasonOfferRefused: true,
                roleLike: true,
                roleDislike: true,
                _count: {
                    select: { reactions: true, comments: true },
                },
                reactions: {
                    select: {
                        userId: true
                    },
                },
                createdAt: true
            },
            where: {
                approved: 1,
                offerGiven: "1",
            },
            orderBy: { createdAt: 'desc' },
        })
        return new NextResponse(JSON.stringify(posts), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error("Error fetching posts:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }
}