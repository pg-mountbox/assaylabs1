'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

const bookingSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  sampleDescription: z.string().min(10, 'Please provide a detailed sample description'),
  specialInstructions: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface LabTest {
  id: number
  testDefinitionId: number
  name: string
  category: string
  subcategory?: string
  description?: string
  price: string
  turnaroundDays: number
  labName: string
  labUniversity: string
  labLocation: string
  labContactEmail: string
}

interface BookingFormProps {
  labTestId: number
}

export function BookingForm({ labTestId }: BookingFormProps) {
  const router = useRouter()
  const [labTest, setLabTest] = useState<LabTest | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  })

  useEffect(() => {
    const fetchLabTest = async () => {
      try {
        const res = await fetch(`/api/tests/${labTestId}`)
        if (!res.ok) {
          throw new Error('Failed to fetch test details')
        }
        const data = await res.json()
        setLabTest(data.labTest)
      } catch (error) {
        console.error('Error fetching lab test:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLabTest()
  }, [labTestId])

  const onSubmit = async (data: BookingFormData) => {
    if (!labTest) return

    setSubmitting(true)
    try {
      const bookingData = {
        labTestId,
        ...data,
        amount: labTest.price,
      }

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      if (!res.ok) {
        throw new Error('Failed to create booking')
      }

      const result = await res.json()
      router.push(`/booking/confirmation/${result.bookingId}`)
    } catch (error) {
      console.error('Error creating booking:', error)
      // Handle error - could show a toast or error message
    } finally {
      setSubmitting(false)
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

  if (!labTest) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-600">Test Not Found</CardTitle>
          <CardDescription>The requested test could not be found.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Test Details */}
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="text-xl font-display font-semibold text-gray-900">
            Test Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{labTest.name}</h3>
            <p className="text-sm text-gray-500 mt-1">
              {labTest.category} {labTest.subcategory && `• ${labTest.subcategory}`}
            </p>
          </div>

          {labTest.description && (
            <p className="text-gray-600 text-sm leading-relaxed">{labTest.description}</p>
          )}

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Lab:</span>
              <span className="font-medium">{labTest.labName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">University:</span>
              <span className="font-medium">{labTest.labUniversity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium">{labTest.labLocation}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Turnaround:</span>
              <span className="font-medium">{labTest.turnaroundDays} days</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Price:</span>
              <span className="text-green-600">${labTest.price}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-display font-semibold text-gray-900">
            Booking Information
          </CardTitle>
          <CardDescription>
            Please provide your contact details and sample information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  {...register('businessName')}
                  className={errors.businessName ? 'border-red-500' : ''}
                  placeholder="Your Company Name"
                />
                {errors.businessName && (
                  <p className="text-sm text-red-500">{errors.businessName.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name *</Label>
                <Input
                  id="contactName"
                  {...register('contactName')}
                  className={errors.contactName ? 'border-red-500' : ''}
                  placeholder="Your Full Name"
                />
                {errors.contactName && (
                  <p className="text-sm text-red-500">{errors.contactName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register('phone')}
                  className={errors.phone ? 'border-red-500' : ''}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sampleDescription">Sample Description *</Label>
              <Textarea
                id="sampleDescription"
                {...register('sampleDescription')}
                className={errors.sampleDescription ? 'border-red-500' : ''}
                placeholder="Describe your sample in detail (e.g., type of food, packaging, storage conditions, etc.)"
                rows={4}
              />
              {errors.sampleDescription && (
                <p className="text-sm text-red-500">{errors.sampleDescription.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                {...register('specialInstructions')}
                placeholder="Any special handling requirements or additional notes"
                rows={3}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Proceed to Payment'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
