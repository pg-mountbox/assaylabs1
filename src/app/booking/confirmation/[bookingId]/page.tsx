import { Suspense } from 'react'
import { BookingConfirmation } from '@/components/booking-confirmation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface ConfirmationPageProps {
  params: Promise<{ bookingId: string }>
}

async function ConfirmationPageContent({ params }: ConfirmationPageProps) {
  const { bookingId } = await params
  const bookingIdNum = parseInt(bookingId)

  if (isNaN(bookingIdNum)) {
    return (
      <div className="min-h-screen bg-gray-50/50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">Invalid Booking ID</CardTitle>
            <CardDescription>The booking ID provided is not valid.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
              Booking Confirmed
            </h1>
            <p className="text-xl text-gray-600">
              Your lab test has been successfully booked
            </p>
          </div>

          <BookingConfirmation bookingId={bookingIdNum} />
        </div>
      </div>
    </div>
  )
}

function ConfirmationPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-80 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ConfirmationPage({ params }: ConfirmationPageProps) {
  return (
    <Suspense fallback={<ConfirmationPageSkeleton />}>
      <ConfirmationPageContent params={params} />
    </Suspense>
  )
}
