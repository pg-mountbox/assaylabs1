'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProfessorCard } from './professor-card'

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

export function ProfessorList() {
  const [professors, setProfessors] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const searchParams = useSearchParams()
  const search = searchParams.get('search')
  const productType = searchParams.get('productType')

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Only fetch if there's a search query or product type filter
        if (!search && !productType) {
          setProfessors([])
          setLoading(false)
          return
        }
        
        const params = new URLSearchParams()
        if (search) params.set('search', search)
        if (productType) params.set('productType', productType)
        
        const response = await fetch(`/api/professors?${params.toString()}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch professors')
        }
        
        const data = await response.json()
        setProfessors(data.professors || [])
      } catch (err) {
        console.error('Error fetching professors:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProfessors()
  }, [search, productType])

  if (loading) {
    return (
      <div className="grid gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <h3 className="text-lg font-semibold">Error Loading Professors</h3>
          <p className="text-sm">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (professors.length === 0) {
    // Show different messages based on whether user has searched or not
    if (!search && !productType) {
      return (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <h3 className="text-lg font-semibold">Search for Expert Professors</h3>
            <p className="text-sm">
              Use the search bar above to find professors by name, specialization, or research interests.
            </p>
          </div>
        </div>
      )
    }
    
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <h3 className="text-lg font-semibold">No Professors Found</h3>
          <p className="text-sm">
            Try adjusting your search criteria or filters
          </p>
        </div>
        <button
          onClick={() => window.location.href = '/professors'}
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Clear Filters
        </button>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      {professors.map((professor) => (
        <ProfessorCard key={professor.id} professor={professor} />
      ))}
    </div>
  )
}
