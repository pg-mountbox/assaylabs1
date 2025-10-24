# AssayLabs - Food Testing Marketplace

A Next.js marketplace connecting food businesses with university labs and professors for testing, consultations, and research projects.

## Features

- 🔬 **Lab Testing**: Find and book food tests with university labs
- 👨‍🏫 **Professor Consultations**: Book 10-20 minute slots with food science experts  
- 🔬 **Research Projects**: Engage professors for multi-week research projects
- 🔐 **Email OTP Authentication**: Passwordless sign-in with magic links
- 📊 **Microsoft Calendar Integration**: Automatic professor availability sync

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **Authentication**: NextAuth.js v5 with email OTP
- **UI**: shadcn/ui + Tailwind CSS
- **Validation**: Zod schemas
- **Email**: Resend
- **Testing**: Vitest + React Testing Library

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment template:

```bash
cp env.example .env.local
```

Fill in your environment variables:

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/food_lab_marketplace

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Email (Resend)
RESEND_API_KEY=your-resend-api-key-here

# Microsoft Graph (for professor calendar sync)
MICROSOFT_CLIENT_ID=your-microsoft-client-id
MICROSOFT_CLIENT_SECRET=your-microsoft-client-secret
MICROSOFT_TENANT_ID=your-microsoft-tenant-id
```

### 3. Database Setup

Generate and run migrations:

```bash
npm run db:generate
npm run db:migrate
```

Seed the database with sample data:

```bash
npm run db:seed
```

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:seed` - Seed database with sample data

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # Protected dashboard pages
│   └── tests/             # Test browsing pages
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── db/                   # Database schema and connection
├── lib/                  # Utilities and configurations
├── test/                 # Test files
└── types/                # TypeScript type definitions
```

## Database Schema

The application uses the following main entities:

- **Users**: Business accounts (companies)
- **Labs**: University laboratories
- **Tests**: Available food tests with pricing
- **Professors**: Academic experts with availability
- **Bookings**: Test bookings, consultations, and projects

## Authentication

The app uses NextAuth.js v5 with email-based OTP (magic links). Users receive a sign-in link via email and can access the platform without passwords.

## Microsoft Calendar Integration

Professors can connect their Microsoft 365 calendars to automatically sync availability. The system reads their free/busy times and creates bookable consultation slots.

## Contributing

1. Follow the coding standards in `.cursorrules`
2. Write tests for new features
3. Use conventional commits
4. Ensure TypeScript strict mode compliance

## License

MIT
