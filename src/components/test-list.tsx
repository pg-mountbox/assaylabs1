'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Test {
  id: number
  testDefinitionId: number
  name: string
  category: string
  subcategory: string
  description: string
  price: string
  turnaroundDays: number
  labName: string
  labUniversity: string
  labLocation: string
  labContactEmail: string
}

export function TestList() {
  const [tests, setTests] = useState<Test[]>([])
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const testDefinitionId = searchParams.get('testDefinitionId')
    
    // Only fetch if a test definition is selected
    if (!testDefinitionId) {
      setTests([])
      return
    }

    const fetchTests = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams()
        params.set('testDefinitionId', testDefinitionId)
        
        // Add other filters
        const location = searchParams.get('location')
        const minPrice = searchParams.get('minPrice')
        const maxPrice = searchParams.get('maxPrice')
        
        if (location) params.set('location', location)
        if (minPrice) params.set('minPrice', minPrice)
        if (maxPrice) params.set('maxPrice', maxPrice)

        const response = await fetch(`/api/test-definitions/${testDefinitionId}/labs?${params.toString()}`)
        const data = await response.json()
        setTests(data.tests || [])
      } catch (error) {
        console.error('Error fetching tests:', error)
        setTests([])
      } finally {
        setLoading(false)
      }
    }

    fetchTests()
  }, [searchParams])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Show empty state when no test is selected
  if (!searchParams.get('testDefinitionId')) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Start by searching for a test</h3>
        <p className="text-gray-500">Type a test name above to see available labs and pricing</p>
      </div>
    )
  }

  if (tests.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No labs found</h3>
        <p className="text-gray-500">Try adjusting your search criteria or filters</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Available Labs for {tests[0]?.name}
        </h2>
        <p className="text-gray-600">
          Compare pricing and turnaround times from different university labs
        </p>
      </div>
      
      <div className="grid gap-6">
        {tests.map((test) => (
          <Card key={test.id} className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl font-display font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {test.labName}
                  </CardTitle>
                  <CardDescription className="mt-1 text-base">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {test.category}
                    </span>
                    <span className="ml-2 text-gray-500">• {test.subcategory}</span>
                  </CardDescription>
                </div>
                <div className="text-right ml-4">
                  <div className="text-3xl font-bold text-green-600">
                    ${test.price}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {test.turnaroundDays} days
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                {test.description && (
                  <p className="text-gray-600 leading-relaxed">{test.description}</p>
                )}
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{test.labUniversity}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {test.labLocation} • {test.labContactEmail}
                    </p>
                  </div>
                  
                  <div className="flex gap-3 ml-6">
                    <Button variant="outline" asChild className="h-10 px-6 font-medium">
                      <Link href={`/tests/${test.id}`}>View Details</Link>
                    </Button>
                    <Button asChild className="h-10 px-6 font-medium bg-blue-600 hover:bg-blue-700">
                      <Link href={`/book/test/${test.id}`}>Book Test</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}