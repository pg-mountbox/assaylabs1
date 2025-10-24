import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const professorId = parseInt(id, 10)

    if (isNaN(professorId)) {
      return NextResponse.json(
        { message: 'Invalid professor ID' },
        { status: 400 }
      )
    }

    const professor = await prisma.professor.findUnique({
      where: { id: professorId },
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
        },
      },
    })

    if (!professor) {
      return NextResponse.json(
        { message: 'Professor not found' },
        { status: 404 }
      )
    }

    const result = {
      id: professor.id,
      name: professor.name,
      university: professor.university,
      labName: professor.labName,
      department: professor.department,
      specialization: professor.specialization,
      bio: professor.bio,
      consultationPrice: professor.consultationPrice?.toString() || null,
      researchInterests: professor.researchInterests,
      productTypes: professor.productTypes,
      imageUrl: professor.imageUrl,
      officeHours: professor.officeHours,
      contactEmail: professor.contactEmail,
      availability: professor.availability.map(slot => ({
        id: slot.id,
        startTime: slot.startTime.toISOString(),
        endTime: slot.endTime.toISOString(),
        durationMinutes: slot.durationMinutes,
      })),
    }

    return NextResponse.json({ professor: result })
  } catch (error) {
    console.error('Error fetching professor:', error)
    return NextResponse.json(
      { message: 'Failed to fetch professor', error: (error as Error).message },
      { status: 500 }
    )
  }
}
