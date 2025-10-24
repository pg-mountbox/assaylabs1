import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load environment variables
config({ path: '.env.local' })

const prisma = new PrismaClient()

async function seed() {
  console.log('🌱 Seeding database...')

  // Note: We're not seeding users as they will be created through NextAuth
  // when users sign up for the first time

  // Insert labs
  const labData = [
    {
      name: 'Food Safety Laboratory',
      university: 'UC Davis',
      location: 'Davis, CA',
      contactEmail: 'foodsafety@ucdavis.edu',
      status: 'active',
      description: 'Specialized in food safety and quality analysis.',
      imageUrl: '/images/lab-ucdavis.jpg',
      website: 'https://foodscience.ucdavis.edu',
    },
    {
      name: 'Nutritional Analysis Lab',
      university: 'Cornell University',
      location: 'Ithaca, NY',
      contactEmail: 'nutrition@cornell.edu',
      status: 'active',
      description: 'Advanced research in food processing and innovation.',
      imageUrl: '/images/lab-cornell.jpg',
      website: 'https://foodscience.cornell.edu',
    },
    {
      name: 'Microbiology Research Center',
      university: 'Texas A&M',
      location: 'College Station, TX',
      contactEmail: 'microbiology@tamu.edu',
      status: 'active',
      description: 'Focus on agricultural and food product development.',
      imageUrl: '/images/lab-tamu.jpg',
      website: 'https://agrilife.tamu.edu',
    },
  ]

  const labs = await Promise.all(
    labData.map(lab => prisma.lab.create({ data: lab }))
  )
  console.log('✅ Inserted 3 labs')

  // Insert tests
  const testData = [
    {
      name: 'E. coli Detection',
      description: 'Detection and quantification of E. coli in food samples',
      category: 'Microbiology',
      subcategory: 'Pathogen Testing',
      price: 150.00,
      turnaroundDays: 3,
      labId: labs[0].id,
    },
    {
      name: 'Salmonella Analysis',
      description: 'Comprehensive Salmonella detection and serotyping',
      category: 'Microbiology',
      subcategory: 'Pathogen Testing',
      price: 200.00,
      turnaroundDays: 5,
      labId: labs[0].id,
    },
    {
      name: 'Protein Content Analysis',
      description: 'Quantitative protein analysis using Kjeldahl method',
      category: 'Nutritional Analysis',
      subcategory: 'Macronutrients',
      price: 75.00,
      turnaroundDays: 2,
      labId: labs[1].id,
    },
    {
      name: 'Vitamin C Content',
      description: 'High-performance liquid chromatography for vitamin C quantification',
      category: 'Nutritional Analysis',
      subcategory: 'Vitamins',
      price: 100.00,
      turnaroundDays: 3,
      labId: labs[1].id,
    },
    {
      name: 'Heavy Metals Panel',
      description: 'Analysis of lead, cadmium, mercury, and arsenic levels',
      category: 'Chemistry',
      subcategory: 'Contaminants',
      price: 300.00,
      turnaroundDays: 7,
      labId: labs[2].id,
    },
    {
      name: 'Pesticide Residue Screening',
      description: 'Multi-residue analysis for 200+ pesticides',
      category: 'Chemistry',
      subcategory: 'Contaminants',
      price: 400.00,
      turnaroundDays: 10,
      labId: labs[2].id,
    },
  ]

  await Promise.all(
    testData.map(test => prisma.test.create({ data: test }))
  )
  console.log('✅ Inserted 6 tests')

  // Insert professors
  const professorData = [
    {
      name: 'Dr. Alice Chen',
      university: 'UC Davis',
      department: 'Food Science',
      specialization: 'Food Safety, Microbiology',
      contactEmail: 'alice.chen@ucdavis.edu',
      bio: 'Expert in rapid detection methods for foodborne pathogens.',
      imageUrl: '/images/prof-alice.jpg',
      officeHours: 'Mon, Wed 10-12',
      consultationPrice: 150.00,
      researchInterests: 'Food microbiology, pathogen control, novel preservation techniques.',
    },
    {
      name: 'Dr. Bob Johnson',
      university: 'Cornell University',
      department: 'Food Science',
      specialization: 'Food Chemistry, Product Development',
      contactEmail: 'bob.johnson@cornell.edu',
      bio: 'Focuses on ingredient functionality and new product formulation.',
      imageUrl: '/images/prof-bob.jpg',
      officeHours: 'Tue, Thu 1-3',
      consultationPrice: 180.00,
      researchInterests: 'Food rheology, flavor chemistry, plant-based proteins.',
    },
    {
      name: 'Dr. Carol White',
      university: 'Texas A&M University',
      department: 'Nutrition & Food Science',
      specialization: 'Food Processing, Shelf-Life',
      contactEmail: 'carol.white@tamu.edu',
      bio: 'Research on extending shelf-life and improving food quality.',
      imageUrl: '/images/prof-carol.jpg',
      officeHours: 'Mon, Fri 9-11',
      consultationPrice: 160.00,
      researchInterests: 'Minimal processing, food packaging, waste valorization.',
    },
  ]

  await Promise.all(
    professorData.map(prof => prisma.professor.create({ data: prof }))
  )
  console.log('✅ Inserted 3 professors')

  console.log('🎉 Database seeded successfully!')
}

seed()
  .catch((err) => {
    console.error('❌ Seed failed!', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })