import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search') || ''

    const testDefinitions = await prisma.testDefinition.findMany({
      where: {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        subcategory: true,
      },
      take: 10, // Limit to 10 results for autocomplete
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({ testDefinitions })
  } catch (error) {
    console.error('Error fetching test definitions:', error)
    return NextResponse.json(
      { message: 'Failed to fetch test definitions', error: (error as Error).message },
      { status: 500 }
    )
  }
}
