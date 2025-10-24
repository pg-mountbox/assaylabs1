import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Public routes that don't require authentication
  const publicRoutes = ['/', '/auth/signin', '/auth/signup', '/tests', '/professors']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  // For now, allow all routes - we'll handle auth in the app
  // This avoids the edge runtime issues with nodemailer
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
