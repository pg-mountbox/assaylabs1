'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, FlaskConical, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <FlaskConical className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-display font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                AssayLabs
              </span>
              <span className="text-xs text-gray-500 -mt-1 font-medium">
                Food Testing Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {session && (
              <Link 
                href="/dashboard" 
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                Dashboard
              </Link>
            )}
            <Link 
              href="/tests" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Lab Tests
            </Link>
            <Link 
              href="/professors" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Professors
            </Link>
                    <Link
                      href="/specialized/new"
                      className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                    >
                      Specialized Tests
                    </Link>
            <Link 
              href="/about" 
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <span className="text-sm text-gray-600">
                  {(session.user as any)?.companyName || session.user?.email}
                </span>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => signOut()}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Sign In</span>
                  </Link>
                </Button>
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="flex flex-col space-y-4 py-4">
              {session && (
                <Link 
                  href="/dashboard" 
                  className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              <Link 
                href="/tests" 
                className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Lab Tests
              </Link>
              <Link 
                href="/professors" 
                className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Professors
              </Link>
              <Link 
                href="/specialized/new" 
                className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Specialized Tests
              </Link>
              <Link 
                href="/about" 
                className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="flex flex-col space-y-2 px-4 pt-4 border-t">
                {session ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-600">
                      {(session.user as any)?.companyName || session.user?.email}
                    </div>
                    <Button 
                      variant="outline" 
                      className="justify-start"
                      onClick={() => {
                        signOut()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className="justify-start">
                      <Link href="/auth/signin" className="flex items-center space-x-2">
                        <User className="h-4 w-4" />
                        <span>Sign In</span>
                      </Link>
                    </Button>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 justify-start">
                      <Link href="/auth/signup">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
