import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { professorSearchSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || undefined
    const productType = searchParams.get('productType') || undefined

    // Validate query parameters
    const validatedParams = professorSearchSchema.parse({
      search,
      productType,
    })

    // Build where clause
    const whereClause: any = {}

    // Search across name, specialization, researchInterests, and bio
    if (validatedParams.search) {
      whereClause.OR = [
        { name: { contains: validatedParams.search, mode: 'insensitive' } },
        { specialization: { contains: validatedParams.search, mode: 'insensitive' } },
        { researchInterests: { contains: validatedParams.search, mode: 'insensitive' } },
        { bio: { contains: validatedParams.search, mode: 'insensitive' } },
      ]
    }

    // Filter by product type (if the field exists)
    if (validatedParams.productType) {
      // For now, we'll skip this filter until the database schema is properly updated
      // whereClause.productTypes = {
      //   has: validatedParams.productType,
      // }
    }

    // Get professors with their earliest available slot
    const professors = await prisma.professor.findMany({
      where: whereClause,
      include: {
        availability: {
          where: {
            isBooked: false,
            startTime: {
              gte: new Date(), // Only future slots
            },
          },
          orderBy: {
            startTime: 'asc',
          },
          take: 1, // Only get the earliest slot
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    // Format the response
    const results = professors.map((professor) => {
      const earliestSlot = professor.availability[0]
      
      return {
        id: professor.id,
        name: professor.name,
        university: professor.university,
        labName: professor.labName,
        department: professor.department,
        specialization: professor.specialization,
        bio: professor.bio ? professor.bio.substring(0, 150) + '...' : null,
        fullBio: professor.bio,
        consultationPrice: professor.consultationPrice?.toString() || null,
        researchInterests: professor.researchInterests,
        productTypes: [], // Will be populated once database schema is updated
        imageUrl: professor.imageUrl,
        earliestSlot: earliestSlot ? {
          id: earliestSlot.id,
          startTime: earliestSlot.startTime.toISOString(),
          endTime: earliestSlot.endTime.toISOString(),
          durationMinutes: earliestSlot.durationMinutes,
        } : null,
      }
    })

    return NextResponse.json({ professors: results })
  } catch (error) {
    console.error('Error fetching professors:', error)
    return NextResponse.json(
      { message: 'Failed to fetch professors', error: (error as Error).message },
      { status: 500 }
    )
  }
}
