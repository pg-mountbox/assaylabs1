import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const paymentSchema = z.object({
  paymentMethod: z.string(),
  cardDetails: z.object({
    number: z.string(),
    expiry: z.string(),
    cvv: z.string(),
    name: z.string(),
  }).optional(),
})

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const bookingId = parseInt(id)

    if (isNaN(bookingId)) {
      return NextResponse.json({ message: 'Invalid booking ID' }, { status: 400 })
    }

    const body = await request.json()
    const data = paymentSchema.parse(body)

    // In a real application, you would integrate with a payment processor here
    // For now, we'll just simulate a successful payment

    // Update booking status to confirmed
    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'confirmed' },
    })

    if (!booking) {
      return NextResponse.json({ message: 'Booking not found' }, { status: 404 })
    }

    // In a real app, you might want to:
    // 1. Process the actual payment
    // 2. Send confirmation emails
    // 3. Create invoices
    // 4. Update inventory
    // 5. Send notifications to the lab

    return NextResponse.json({
      message: 'Payment processed successfully',
      bookingId: booking.id,
      status: 'confirmed',
    })
  } catch (error) {
    console.error('Error processing payment:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: 'Invalid payment data', errors: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { message: 'Failed to process payment', error: (error as Error).message },
      { status: 500 }
    )
  }
}
