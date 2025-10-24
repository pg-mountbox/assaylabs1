'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, DollarSign, GraduationCap, Building, ChevronDown, ChevronUp } from 'lucide-react'

interface Professor {
  id: number
  name: string
  university: string
  labName?: string
  department: string
  specialization: string
  bio?: string
  fullBio?: string
  consultationPrice?: string
  researchInterests?: string
  productTypes: string[]
  imageUrl?: string
  earliestSlot?: {
    id: number
    startTime: string
    endTime: string
    durationMinutes: number
  }
}

interface ProfessorCardProps {
  professor: Professor
}

export function ProfessorCard({ professor }: ProfessorCardProps) {
  const [showFullBio, setShowFullBio] = useState(false)
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const formatPrice = (price?: string) => {
    if (!price) return 'Contact for pricing'
    const pricePer10Min = (parseFloat(price) / 3).toFixed(0) // Assuming 30-min sessions, so divide by 3
    return `$${pricePer10Min}/10 min`
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          {/* Professor Avatar */}
          <div className="flex-shrink-0">
            {professor.imageUrl ? (
              <img
                src={professor.imageUrl}
                alt={professor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                {getInitials(professor.name)}
              </div>
            )}
          </div>

          {/* Professor Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {professor.name}
                </h3>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>{professor.university}</span>
                  {professor.labName && (
                    <>
                      <span>•</span>
                      <Building className="h-4 w-4" />
                      <span>{professor.labName}</span>
                    </>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="secondary" className="text-xs">
                    {professor.specialization}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {professor.department}
                  </Badge>
                </div>

                {/* Bio */}
                <div className="text-gray-700 text-sm mb-4">
                  {showFullBio ? (
                    <div>
                      <p className="mb-2">{professor.fullBio || professor.bio}</p>
                      {professor.researchInterests && (
                        <div>
                          <strong>Research Interests:</strong> {professor.researchInterests}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>{professor.bio}</p>
                  )}
                  
                  {professor.bio && professor.bio.length > 150 && (
                    <button
                      onClick={() => setShowFullBio(!showFullBio)}
                      className="text-blue-600 hover:text-blue-800 text-xs mt-1 flex items-center"
                    >
                      {showFullBio ? (
                        <>
                          <ChevronUp className="h-3 w-3 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-3 w-3 mr-1" />
                          View Full Bio
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Product Types */}
                {professor.productTypes.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-1">Expertise Areas:</div>
                    <div className="flex flex-wrap gap-1">
                      {professor.productTypes.map((type) => (
                        <Badge key={type} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Availability and Pricing */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    {professor.earliestSlot && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500">Earliest available slot:</span>
                          <span>
                            {formatDate(professor.earliestSlot.startTime)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{formatPrice(professor.consultationPrice)}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant="outline"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      View Detailed Bio
                    </Button>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={!professor.earliestSlot}
                    >
                      {professor.earliestSlot ? 'Book Consultation' : 'No Available Slots'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
