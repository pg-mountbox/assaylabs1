import { Suspense } from 'react'
import { PaymentScreen } from '@/components/payment-screen'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface PaymentPageProps {
  params: Promise<{ bookingId: string }>
}

async function PaymentPageContent({ params }: PaymentPageProps) {
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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
              Payment
            </h1>
            <p className="text-xl text-gray-600">
              Complete your payment to confirm your lab test booking
            </p>
          </div>

          <PaymentScreen bookingId={bookingIdNum} />
        </div>
      </div>
    </div>
  )
}

function PaymentPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-80 mx-auto" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <Card className="w-full">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage({ params }: PaymentPageProps) {
  return (
    <Suspense fallback={<PaymentPageSkeleton />}>
      <PaymentPageContent params={params} />
    </Suspense>
  )
}
