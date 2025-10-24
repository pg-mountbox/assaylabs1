import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const testDefinitionId = parseInt(id)
    
    if (isNaN(testDefinitionId)) {
      return NextResponse.json(
        { message: 'Invalid test definition ID' },
        { status: 400 }
      )
    }

    const { searchParams } = new URL(request.url)
    const filters = {
      location: searchParams.get('location') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    }

    // Build where conditions
    const where: any = {
      testDefinitionId,
      lab: {
        status: 'active'
      },
      isAvailable: true
    }

    if (filters.location) {
      where.lab = {
        ...where.lab,
        location: {
          contains: filters.location,
          mode: 'insensitive'
        }
      }
    }

    if (filters.minPrice !== undefined) {
      where.price = {
        ...where.price,
        gte: filters.minPrice
      }
    }

    if (filters.maxPrice !== undefined) {
      where.price = {
        ...where.price,
        lte: filters.maxPrice
      }
    }

    const labTests = await prisma.labTest.findMany({
      where,
      include: {
        testDefinition: true,
        lab: true
      },
      orderBy: {
        price: 'asc'
      }
    })

    // Transform results
    const results = labTests.map(labTest => ({
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
    }))

    return NextResponse.json({ tests: results })
  } catch (error) {
    console.error('Error fetching lab tests:', error)
    return NextResponse.json(
      { message: 'Failed to fetch lab tests', error: (error as Error).message },
      { status: 500 }
    )
  }
}
