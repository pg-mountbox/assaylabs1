import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-display font-bold text-gray-900 mb-8 tracking-tight">
            Connect with University Research
          </h1>
          <p className="text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Find university labs for food testing, book consultations with professors, 
            and submit customised test requirements to solve your food industry challenges.
          </p>
          <div className="flex gap-6 justify-center">
            <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold bg-blue-600 hover:bg-blue-700">
              <Link href="/auth/signin">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="h-14 px-8 text-lg font-semibold border-2">
              <Link href="/tests">Browse Tests</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-0 group">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">Lab Testing</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Find university labs that can perform specific food tests. 
              Book and pay for tests with transparent pricing and turnaround times.
            </p>
            <Button asChild variant="outline" className="h-12 px-6 font-semibold border-2 hover:bg-blue-50">
              <Link href="/tests">Browse Tests</Link>
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-0 group">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">Professor Consultations</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Book 10-20 minute consultation slots with professors who specialize 
              in your area of interest. Get expert advice quickly.
            </p>
            <Button asChild variant="outline" className="h-12 px-6 font-semibold border-2 hover:bg-green-50">
              <Link href="/professors">Find Professors</Link>
            </Button>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all duration-300 border-0 group">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-display font-bold mb-4 text-gray-900">Customised Tests</h3>
            <p className="text-gray-600 mb-6 leading-relaxed text-lg">
              Submit customised test requirements and connect with expert laboratories 
              and professors for complex food industry challenges.
            </p>
            <Button asChild variant="outline" className="h-12 px-6 font-semibold border-2 hover:bg-purple-50">
              <Link href="/specialized/new">Submit Test</Link>
            </Button>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-4xl font-display font-bold text-gray-900 mb-6">
            Trusted by Food Industry Leaders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of food companies already using AssayLabs to access university research resources.
          </p>
        </div>
      </div>
    </div>
  )
}
