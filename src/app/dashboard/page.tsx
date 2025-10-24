import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-xl text-gray-600">Welcome to your AssayLabs dashboard</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-display font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              Lab Testing
            </CardTitle>
            <CardDescription className="text-base">
              Find and book food tests with university labs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full h-11 font-semibold">
              <Link href="/tests">Browse Tests</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-display font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
              Professor Consultations
            </CardTitle>
            <CardDescription className="text-base">
              Book quick consultations with food science experts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full h-11 font-semibold">
              <Link href="/professors">Find Professors</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-display font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
              Research Projects
            </CardTitle>
            <CardDescription className="text-base">
              Engage professors for long-term research projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full h-11 font-semibold">
              <Link href="/projects/new">Start Project</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Your latest test bookings and consultations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500">No recent bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/bookings">View All Bookings</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/profile">Update Profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
