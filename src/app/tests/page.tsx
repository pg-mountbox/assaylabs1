import { Suspense } from 'react'
import { TestSearch } from '@/components/test-search'
import { TestList } from '@/components/test-list'

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
              Lab Tests
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find and book food tests with university labs. Get accurate results from trusted research institutions.
            </p>
          </div>

          <Suspense fallback={
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }>
            <TestSearch />
          </Suspense>
          
          <Suspense fallback={
            <div className="grid gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm border animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          }>
            <TestList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
