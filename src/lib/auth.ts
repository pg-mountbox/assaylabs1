import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      id: 'otp',
      name: 'OTP',
      credentials: {
        email: { label: 'Email', type: 'email' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        console.log('=== AUTH DEBUG ===')
        console.log('Credentials received:', credentials)
        console.log('DEMO_MODE:', process.env.DEMO_MODE)
        console.log('NODE_ENV:', process.env.NODE_ENV)

        if (!credentials?.email || !credentials?.otp) {
          console.log('Missing credentials')
          return null
        }

        // Always accept any OTP in demo mode
        console.log('Processing OTP authentication...')
        
        try {
          const email = credentials.email as string
          // Find or create user
          let user = await prisma.user.findUnique({
            where: { email }
          })

          if (!user) {
            console.log('Creating new user for:', email)
            user = await prisma.user.create({
              data: {
                email,
                name: email.split('@')[0],
                companyName: 'Demo Company',
              }
            })
          } else {
            console.log('Found existing user:', user.id)
          }

          const result = {
            id: user.id,
            email: user.email,
            name: user.name,
            companyName: user.companyName,
          }
          
          console.log('Authentication successful, returning user:', result)
          return result
        } catch (error) {
          console.error('Database error during authentication:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.companyName = (user as any).companyName
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        ;(session.user as any).companyName = token.companyName
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  debug: process.env.NODE_ENV === 'development',
})
