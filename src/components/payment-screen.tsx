'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2, CreditCard, Smartphone, Shield } from 'lucide-react'

interface BookingDetails {
  id: number
  amount: string
  testName: string
  labName: string
  labUniversity: string
  businessName: string
  contactName: string
  email: string
}

interface PaymentScreenProps {
  bookingId: number
}

export function PaymentScreen({ bookingId }: PaymentScreenProps) {
  const router = useRouter()
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  })

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

  const handlePayment = async () => {
    if (!booking) return

    setProcessing(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))

      const res = await fetch(`/api/bookings/${bookingId}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          cardDetails: paymentMethod === 'card' ? cardDetails : null,
        }),
      })

      if (!res.ok) {
        throw new Error('Payment failed')
      }

      const result = await res.json()
      router.push(`/booking/confirmation/${bookingId}`)
    } catch (error) {
      console.error('Payment error:', error)
      // Handle payment error
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
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
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Order Summary */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-xl font-display font-semibold text-gray-900">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{booking.testName}</h3>
            <p className="text-sm text-gray-500 mt-1">{booking.labName}</p>
            <p className="text-sm text-gray-500">{booking.labUniversity}</p>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Test Fee:</span>
              <span className="font-medium">${booking.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Processing Fee:</span>
              <span className="font-medium">$5.00</span>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <span>Total:</span>
              <span className="text-green-600">${(parseFloat(booking.amount) + 5).toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-800">
              <Shield className="h-5 w-5" />
              <span className="font-medium text-sm">Secure Payment</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Your payment information is encrypted and secure
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display font-semibold text-gray-900">
            Payment Method
          </CardTitle>
          <CardDescription>
            Choose your preferred payment method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                <CreditCard className="h-4 w-4" />
                <span>Credit/Debit Card</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="paypal" id="paypal" />
              <Label htmlFor="paypal" className="flex items-center space-x-2 cursor-pointer">
                <Smartphone className="h-4 w-4" />
                <span>PayPal</span>
              </Label>
            </div>
          </RadioGroup>

          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  value={cardDetails.name}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={cardDetails.number}
                  onChange={(e) => setCardDetails(prev => ({ ...prev, number: e.target.value }))}
                  placeholder="1234 5678 9012 3456"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                    placeholder="123"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'paypal' && (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <p className="text-gray-600">You will be redirected to PayPal to complete your payment</p>
            </div>
          )}

          <Button
            onClick={handlePayment}
            className="w-full h-12 text-lg font-semibold"
            disabled={processing || (paymentMethod === 'card' && (!cardDetails.name || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv))}
          >
            {processing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              `Pay $${(parseFloat(booking.amount) + 5).toFixed(2)}`
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            By proceeding, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
