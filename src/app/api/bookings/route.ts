import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const createBookingSchema = z.object({
  labTestId: z.number(),
  email: z.string().email(),
  businessName: z.string().min(2),
  contactName: z.string().min(2),
  phone: z.string().min(10),
  sampleDescription: z.string().min(10),
  specialInstructions: z.string().optional(),
  amount: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = createBookingSchema.parse(body)

    // Get lab test details
    const labTest = await prisma.labTest.findUnique({
      where: { id: data.labTestId },
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

    // Create a temporary user for the booking (in a real app, this would come from auth)
    let user = await prisma.user.findFirst({
      where: { email: data.email }
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: data.email,
          name: data.contactName,
          companyName: data.businessName,
        }
      })
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        bookingType: 'test',
        referenceId: 0, // Will be updated after creating test booking
        status: 'pending',
        amount: parseFloat(data.amount),
      },
    })

    // Create test booking
    const testBooking = await prisma.testBooking.create({
      data: {
        bookingId: booking.id,
        labTestId: data.labTestId,
        sampleInfo: {
          email: data.email,
          businessName: data.businessName,
          contactName: data.contactName,
          phone: data.phone,
          sampleDescription: data.sampleDescription,
          specialInstructions: data.specialInstructions,
        },
      },
    })

    // Update booking with reference ID
    await prisma.booking.update({
      where: { id: booking.id },
      data: { referenceId: testBooking.id },
    })

    // Generate booking ID (in a real app, this might be more sophisticated)
    const bookingId = `AL${booking.id.toString().padStart(6, '0')}`

    return NextResponse.json({
      bookingId: booking.id,
      bookingNumber: bookingId,
      message: 'Booking created successfully',
    })
  } catch (error) {
    console.error('Error creating booking:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid input data', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: 'Failed to create booking', error: (error as Error).message },
      { status: 500 }
    )
  }
}
