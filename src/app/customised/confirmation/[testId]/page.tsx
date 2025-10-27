import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Calendar, Clock, FileText } from 'lucide-react'

interface ConfirmationPageProps {
  params: Promise<{ testId: string }>
}

export default async function ConfirmationPage({ params }: ConfirmationPageProps) {
  const { testId: testIdStr } = await params
  const testId = parseInt(testIdStr)
  
  if (isNaN(testId)) {
    notFound()
  }

  const project = await prisma.projectEngagement.findUnique({
    where: { id: testId },
  })

  if (!project) {
    notFound()
  }

  const requirements = JSON.parse(project.requirements || '{}')

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
              Customised Test Submitted Successfully!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your customised test request has been submitted and our team will review it shortly.
            </p>
          </div>

          {/* Project Details */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Test Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">Test ID</h4>
                  <p className="text-sm text-gray-600">#{project.id}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Test Type</h4>
                  <p className="text-sm text-gray-600 capitalize">
                    {project.title.replace(' Test', '').replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Status</h4>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    {project.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Submitted</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(project.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>What Happens Next?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Review Process</h4>
                    <p className="text-sm text-gray-600">
                      Our team will review your test requirements and match you with suitable laboratories and professors.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Expert Matching</h4>
                    <p className="text-sm text-gray-600">
                      We&apos;ll identify the best laboratories and professors for your specific test needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Proposal & Timeline</h4>
                    <p className="text-sm text-gray-600">
                      You&apos;ll receive detailed proposals with timelines, costs, and test plans within 2-3 business days.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Test Kickoff</h4>
                    <p className="text-sm text-gray-600">
                      Once you approve a proposal, we&apos;ll facilitate the connection and test kickoff.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Need Help?</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  If you have any questions about your test submission, please don&apos;t hesitate to contact us.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline" asChild>
                    <a href="mailto:support@assaylabs.com">Email Support</a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="tel:+1-555-0123">Call Us</a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <a href="/customised/new">Submit Another Test</a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="/dashboard">Go to Dashboard</a>
                    </Button>
                  </div>
        </div>
      </div>
    </div>
  )
}
