export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
              About AssayLabs
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connecting food businesses with university research resources for better testing, 
              innovation, and growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-display font-semibold text-gray-900">
                Our Mission
              </h2>
              <p className="text-gray-600 leading-relaxed">
                We believe that every food business should have access to world-class research 
                facilities and expertise. AssayLabs bridges the gap between industry needs and 
                academic resources, making food testing and research collaboration accessible, 
                transparent, and efficient.
              </p>
              <p className="text-gray-600 leading-relaxed">
                By connecting food companies with university labs and professors, we&apos;re 
                accelerating innovation in the food industry and helping businesses make 
                data-driven decisions about their products.
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-display font-semibold text-gray-900">
                What We Offer
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Lab Testing Services</h3>
                    <p className="text-sm text-gray-600">Access to university labs for comprehensive food testing</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Consultations</h3>
                    <p className="text-sm text-gray-600">Quick consultations with food science professors</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Research Projects</h3>
                    <p className="text-sm text-gray-600">Long-term research collaborations with academic experts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm border">
            <h2 className="text-2xl font-display font-semibold text-gray-900 mb-6 text-center">
              Why Choose AssayLabs?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Trusted Labs</h3>
                <p className="text-sm text-gray-600">All labs are verified university research facilities with proven track records</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Fast Turnaround</h3>
                <p className="text-sm text-gray-600">Streamlined booking process with transparent pricing and timelines</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Expert Network</h3>
                <p className="text-sm text-gray-600">Connect with leading food science professors and researchers</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="text-2xl font-display font-semibold text-gray-900">
              Ready to Get Started?
            </h2>
            <p className="text-gray-600">
              Join hundreds of food companies already using AssayLabs to access university research resources.
            </p>
            <div className="flex gap-4 justify-center">
              <a 
                href="/tests" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Browse Tests
              </a>
              <a 
                href="/auth/signup" 
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
