'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  MapPin, 
  Clock, 
  Package, 
  Printer, 
  Download,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-react'

interface BookingDetails {
  id: number
  bookingId: string
  testName: string
  labName: string
  labUniversity: string
  labLocation: string
  labContactEmail: string
  labPhone?: string
  businessName: string
  contactName: string
  email: string
  amount: string
  turnaroundDays: number
  sampleDescription: string
  specialInstructions?: string
  status: string
  createdAt: string
}

interface BookingConfirmationProps {
  bookingId: number
}

export function BookingConfirmation({ bookingId }: BookingConfirmationProps) {
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`)
        if (!res.ok) {
          throw new Error('Failed to fetch booking details')
        }
        const data = await res.json()
        setBooking(data.booking)
      } catch (error) {
        console.error('Error fetching booking:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBooking()
  }, [bookingId])

  const handlePrintLabels = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    // In a real implementation, this would generate and download a PDF
    const element = document.createElement('a')
    const file = new Blob([`Booking Confirmation - ${booking?.bookingId}\n\nTest: ${booking?.testName}\nLab: ${booking?.labName}\nAmount: $${booking?.amount}`], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `booking-${booking?.bookingId}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (loading) {
    return (
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="w-full">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!booking) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-600">Booking Not Found</CardTitle>
          <CardDescription>The requested booking could not be found.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      {/* Success Message */}
      <div className="text-center bg-green-50 border border-green-200 rounded-xl p-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-display font-bold text-green-800 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-green-700 mb-4">
          Your lab test has been successfully booked. You will receive a confirmation email shortly.
        </p>
        <Badge variant="outline" className="text-lg px-4 py-2 border-green-300 text-green-800">
          Booking ID: {booking.bookingId}
        </Badge>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Booking Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-display font-semibold text-gray-900 flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-mono font-semibold">{booking.bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Test:</span>
                <span className="font-medium text-right">{booking.testName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Lab:</span>
                <span className="font-medium text-right">{booking.labName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">University:</span>
                <span className="font-medium text-right">{booking.labUniversity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Turnaround:</span>
                <span className="font-medium">{booking.turnaroundDays} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-green-600">${booking.amount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-semibold text-gray-900 mb-2">Sample Description:</h4>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {booking.sampleDescription}
              </p>
              {booking.specialInstructions && (
                <>
                  <h4 className="font-semibold text-gray-900 mb-2 mt-4">Special Instructions:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {booking.specialInstructions}
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lab Information & Shipping */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-display font-semibold text-gray-900 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Lab Information & Shipping
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Lab Address */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Shipping Address:</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">{booking.labName}</p>
                <p className="text-sm text-gray-600">{booking.labUniversity}</p>
                <p className="text-sm text-gray-600">{booking.labLocation}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600 flex items-center">
                    <Mail className="h-3 w-3 mr-1" />
                    {booking.labContactEmail}
                  </p>
                  {booking.labPhone && (
                    <p className="text-sm text-gray-600 flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {booking.labPhone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Packaging Instructions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Sample Packaging Instructions:</h4>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800">Use appropriate packaging to prevent contamination</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800">Include cold packs if sample requires refrigeration</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800">Label package with booking ID: <span className="font-mono font-semibold">{booking.bookingId}</span></p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800">Ship within 24 hours of collection</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-blue-800">Use overnight shipping for perishable samples</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handlePrintLabels} 
                className="w-full h-11 font-semibold"
                variant="outline"
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Shipping Labels
              </Button>
              <Button 
                onClick={handleDownloadPDF} 
                className="w-full h-11 font-semibold"
                variant="outline"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Confirmation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display font-semibold text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            What Happens Next?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900">1. Ship Your Sample</h4>
              <p className="text-sm text-gray-600">
                Package your sample according to the instructions and ship to the lab address provided.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900">2. Lab Processing</h4>
              <p className="text-sm text-gray-600">
                The lab will process your sample and provide results within {booking.turnaroundDays} business days.
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900">3. Receive Results</h4>
              <p className="text-sm text-gray-600">
                You&apos;ll receive detailed test results and a certificate via email.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
