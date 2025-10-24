'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter } from 'lucide-react'

const PRODUCT_TYPES = [
  'All Product Types',
  'Beverages',
  'High fat products',
  'cheese',
  'powders',
  'Dairy Ingredients',
  'fermented products',
  'Other'
]

export function ProfessorSearch() {
  const searchParams = useSearchParams()
  const router = useRouter()
  
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [productType, setProductType] = useState(searchParams.get('productType') || 'All Product Types')

  const handleSearch = () => {
    const params = new URLSearchParams()
    
    if (search.trim()) {
      params.set('search', search.trim())
    }
    
    if (productType && productType !== 'All Product Types') {
      params.set('productType', productType)
    }
    
    const queryString = params.toString()
    router.push(`/professors${queryString ? `?${queryString}` : ''}`)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <Search className="h-5 w-5" />
            <span className="font-medium">Search for Expert Professors</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by name, specialization, or research interests..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                className="h-11"
              />
            </div>
            
            <div className="flex space-x-2">
              <Select value={productType} onValueChange={setProductType}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Product Type" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button onClick={handleSearch} className="h-11 px-6">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Filter className="h-4 w-4" />
            <span>Filter by product type to find professors with relevant expertise</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
