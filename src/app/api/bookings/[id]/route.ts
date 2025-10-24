import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const bookingId = parseInt(id)

    if (isNaN(bookingId)) {
      return NextResponse.json({ message: 'Invalid booking ID' }, { status: 400 })
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        testBookings: {
          include: {
            labTest: {
              include: {
                testDefinition: true,
                lab: true,
              },
            },
          },
        },
      },
    })

    if (!booking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 })
    }

    const testBooking = booking.testBookings[0]
    if (!testBooking) {
      return NextResponse.json({ message: 'Test booking not found' }, { status: 404 })
    }

    const sampleInfo = testBooking.sampleInfo as any

    const result = {
      booking: {
        id: booking.id,
        bookingId: `AL${booking.id.toString().padStart(6, '0')}`,
        testName: testBooking.labTest.testDefinition.name,
        labName: testBooking.labTest.lab.name,
        labUniversity: testBooking.labTest.lab.university,
        labLocation: testBooking.labTest.lab.location,
        labContactEmail: testBooking.labTest.lab.contactEmail,
        labPhone: testBooking.labTest.lab.contactEmail, // Using email as fallback
        businessName: sampleInfo.businessName,
        contactName: sampleInfo.contactName,
        email: sampleInfo.email,
        amount: testBooking.labTest.price.toString(),
        turnaroundDays: testBooking.labTest.turnaroundDays,
        sampleDescription: sampleInfo.sampleDescription,
        specialInstructions: sampleInfo.specialInstructions,
        status: booking.status,
        createdAt: booking.createdAt.toISOString(),
      },
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { message: 'Failed to fetch booking', error: (error as Error).message },
      { status: 500 }
    )
  }
}
