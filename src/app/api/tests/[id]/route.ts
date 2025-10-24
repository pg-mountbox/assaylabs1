import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const labTestId = parseInt(id)
    
    if (isNaN(labTestId)) {
      return NextResponse.json(
        { message: 'Invalid lab test ID' },
        { status: 400 }
      )
    }

    const labTest = await prisma.labTest.findUnique({
      where: { id: labTestId },
      include: {
        testDefinition: true,
        lab: true,
      },
    })

    if (!labTest) {
      return NextResponse.json(
        { message: 'Lab test not found' },
        { status: 404 }
      )
    }

    const result = {
      id: labTest.id,
      testDefinitionId: labTest.testDefinitionId,
      name: labTest.testDefinition.name,
      category: labTest.testDefinition.category,
      subcategory: labTest.testDefinition.subcategory,
      description: labTest.testDefinition.description,
      price: labTest.price.toString(),
      turnaroundDays: labTest.turnaroundDays,
      labName: labTest.lab.name,
      labUniversity: labTest.lab.university,
      labLocation: labTest.lab.location,
      labContactEmail: labTest.lab.contactEmail,
      labDescription: labTest.lab.description,
      labWebsite: labTest.lab.website,
    }

    return NextResponse.json({ labTest: result })
  } catch (error) {
    console.error('Error fetching lab test:', error)
    return NextResponse.json(
      { message: 'Failed to fetch lab test', error: (error as Error).message },
      { status: 500 }
    )
  }
}