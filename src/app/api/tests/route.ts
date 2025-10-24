import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { testSearchSchema } from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = testSearchSchema.parse({
      category: searchParams.get('category') || undefined,
      subcategory: searchParams.get('subcategory') || undefined,
      location: searchParams.get('location') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      search: searchParams.get('search') || undefined,
    })

    // Build where conditions for lab tests
    const where: any = {
      lab: {
        status: 'active'
      },
      isAvailable: true
    }

    if (filters.category) {
      where.testDefinition = {
        category: filters.category
      }
    }

    if (filters.subcategory) {
      where.testDefinition = {
        ...where.testDefinition,
        subcategory: filters.subcategory
      }
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

    if (filters.search) {
      where.testDefinition = {
        ...where.testDefinition,
        OR: [
          { name: { contains: filters.search, mode: 'insensitive' } },
          { description: { contains: filters.search, mode: 'insensitive' } }
        ]
      }
    }

    const results = await prisma.labTest.findMany({
      where,
      include: {
        testDefinition: true,
        lab: true
      }
    })

    // Transform results to match expected format
    const tests = results.map(labTest => ({
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

    return NextResponse.json({ tests })
  } catch (error) {
    console.error('Error fetching tests:', error)
    return NextResponse.json(
      { message: 'Failed to fetch tests', error: (error as Error).message },
      { status: 500 }
    )
  }
}