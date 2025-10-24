'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { testSearchSchema } from '@/lib/validations'

interface TestDefinition {
  id: number
  name: string
  description: string
  category: string
  subcategory: string
}

export function TestSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [testDefinitions, setTestDefinitions] = useState<TestDefinition[]>([])
  const [selectedTest, setSelectedTest] = useState<TestDefinition | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Get current filters from URL
  const currentFilters = {
    category: searchParams.get('category') || '',
    subcategory: searchParams.get('subcategory') || '',
    location: searchParams.get('location') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  }

  // Search for test definitions as user types
  const searchTestDefinitions = useCallback(async (query: string) => {
    if (query.length < 2) {
      setTestDefinitions([])
      setShowSuggestions(false)
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/test-definitions?search=${encodeURIComponent(query)}`)
      const data = await response.json()
      setTestDefinitions(data.testDefinitions || [])
      setShowSuggestions(true)
    } catch (error) {
      console.error('Error searching test definitions:', error)
      setTestDefinitions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchTestDefinitions(searchQuery)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, searchTestDefinitions])

  const handleTestSelect = (testDef: TestDefinition) => {
    setSelectedTest(testDef)
    setSearchQuery(testDef.name)
    setShowSuggestions(false)
  }

  const handleSearch = () => {
    if (!selectedTest) return

    const params = new URLSearchParams()
    params.set('testDefinitionId', selectedTest.id.toString())
    
    // Add other filters
    if (currentFilters.location) params.set('location', currentFilters.location)
    if (currentFilters.minPrice) params.set('minPrice', currentFilters.minPrice)
    if (currentFilters.maxPrice) params.set('maxPrice', currentFilters.maxPrice)

    router.push(`/tests?${params.toString()}`)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSelectedTest(null)
    setTestDefinitions([])
    setShowSuggestions(false)
    router.push('/tests')
  }

  // Get unique categories and subcategories from test definitions
  const categories = Array.from(new Set(testDefinitions.map(td => td.category)))
  const subcategories = selectedTest ? 
    Array.from(new Set(testDefinitions.filter(td => td.category === selectedTest.category).map(td => td.subcategory))) :
    []

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-display font-bold text-gray-900">
          Search Tests
        </CardTitle>
        <p className="text-gray-600">Start typing to find tests, then select to see available labs</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Test Search */}
        <div className="space-y-3">
          <Label htmlFor="testSearch" className="text-sm font-medium text-gray-700">
            Search for a test
          </Label>
          <div className="relative">
            <Input
              id="testSearch"
              placeholder="Type test name (e.g., Protein Analysis, E. coli Detection)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => testDefinitions.length > 0 && setShowSuggestions(true)}
              className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            {isLoading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              </div>
            )}
            
            {/* Suggestions Dropdown */}
            {showSuggestions && testDefinitions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {testDefinitions.map((testDef) => (
                  <div
                    key={testDef.id}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    onClick={() => handleTestSelect(testDef)}
                  >
                    <div className="font-medium text-gray-900">{testDef.name}</div>
                    <div className="text-sm text-gray-500">{testDef.category} • {testDef.subcategory}</div>
                    {testDef.description && (
                      <div className="text-xs text-gray-400 mt-1">{testDef.description}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selected Test Display */}
        {selectedTest && (
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">{selectedTest.name}</h3>
                <p className="text-sm text-blue-700">{selectedTest.category} • {selectedTest.subcategory}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={clearSearch}
                className="text-blue-600 border-blue-300 hover:bg-blue-100"
              >
                Clear
              </Button>
            </div>
          </div>
        )}

        {/* Filters - only show when a test is selected */}
        {selectedTest && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="location" className="text-sm font-medium text-gray-700">Location</Label>
              <Input
                id="location"
                placeholder="e.g., California, New York"
                value={currentFilters.location}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams)
                  if (e.target.value) {
                    params.set('location', e.target.value)
                  } else {
                    params.delete('location')
                  }
                  router.push(`/tests?${params.toString()}`)
                }}
                className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="priceRange" className="text-sm font-medium text-gray-700">Price Range</Label>
              <div className="flex gap-3">
                <Input
                  placeholder="Min price"
                  type="number"
                  value={currentFilters.minPrice}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams)
                    if (e.target.value) {
                      params.set('minPrice', e.target.value)
                    } else {
                      params.delete('minPrice')
                    }
                    router.push(`/tests?${params.toString()}`)
                  }}
                  className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                <Input
                  placeholder="Max price"
                  type="number"
                  value={currentFilters.maxPrice}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams)
                    if (e.target.value) {
                      params.set('maxPrice', e.target.value)
                    } else {
                      params.delete('maxPrice')
                    }
                    router.push(`/tests?${params.toString()}`)
                  }}
                  className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Search Button - only show when a test is selected */}
        {selectedTest && (
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSearch} className="h-11 px-8 font-medium">
              Find Labs for {selectedTest.name}
            </Button>
            <Button variant="outline" onClick={clearSearch} className="h-11 px-8 font-medium">
              Clear Search
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}