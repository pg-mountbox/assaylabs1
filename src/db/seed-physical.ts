import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load environment variables
config({ path: '.env.local' })

const prisma = new PrismaClient()

async function seedPhysicalTests() {
  console.log('🌱 Adding Physical Characterization tests...')

  // Get existing labs
  const labs = await prisma.lab.findMany()
  if (labs.length === 0) {
    console.error('❌ No labs found. Please run the comprehensive seed first.')
    process.exit(1)
  }

  // Physical Characterization Tests
  const physicalTests = [
    {
      name: 'Rheological Analysis - Viscosity',
      description: 'Measurement of flow properties and viscosity using rotational rheometer',
      category: 'Physical Characterization',
      subcategory: 'Rheology',
      price: 120.00,
      turnaroundDays: 3,
      labId: labs[0].id, // UC Davis
    },
    {
      name: 'Rheological Analysis - Texture Profile',
      description: 'Texture analysis using texture analyzer for hardness, springiness, cohesiveness',
      category: 'Physical Characterization',
      subcategory: 'Rheology',
      price: 100.00,
      turnaroundDays: 2,
      labId: labs[0].id,
    },
    {
      name: 'Dynamic Rheological Analysis',
      description: 'Oscillatory rheology measurements for viscoelastic properties',
      category: 'Physical Characterization',
      subcategory: 'Rheology',
      price: 150.00,
      turnaroundDays: 4,
      labId: labs[0].id,
    },
    {
      name: 'Particle Size Distribution - Laser Diffraction',
      description: 'Particle size analysis using laser diffraction technique',
      category: 'Physical Characterization',
      subcategory: 'Particle size',
      price: 110.00,
      turnaroundDays: 2,
      labId: labs[1].id, // Cornell
    },
    {
      name: 'Particle Size Distribution - Sieve Analysis',
      description: 'Particle size determination using standard sieve analysis',
      category: 'Physical Characterization',
      subcategory: 'Particle size',
      price: 80.00,
      turnaroundDays: 2,
      labId: labs[1].id,
    },
    {
      name: 'Particle Size Distribution - Dynamic Light Scattering',
      description: 'Sub-micron particle size analysis using DLS technique',
      category: 'Physical Characterization',
      subcategory: 'Particle size',
      price: 130.00,
      turnaroundDays: 3,
      labId: labs[1].id,
    },
    {
      name: 'Powder Flowability Analysis',
      description: 'Measurement of powder flow properties using flowability tester',
      category: 'Physical Characterization',
      subcategory: 'Powder characterization',
      price: 90.00,
      turnaroundDays: 2,
      labId: labs[2].id, // Texas A&M
    },
    {
      name: 'Powder Density Analysis',
      description: 'Bulk density, tapped density, and Hausner ratio determination',
      category: 'Physical Characterization',
      subcategory: 'Powder characterization',
      price: 70.00,
      turnaroundDays: 1,
      labId: labs[2].id,
    },
    {
      name: 'Powder Compressibility Analysis',
      description: 'Compressibility and compactibility analysis of powders',
      category: 'Physical Characterization',
      subcategory: 'Powder characterization',
      price: 100.00,
      turnaroundDays: 3,
      labId: labs[2].id,
    },
    {
      name: 'Powder Moisture Content Analysis',
      description: 'Moisture content determination in powder samples',
      category: 'Physical Characterization',
      subcategory: 'Powder characterization',
      price: 60.00,
      turnaroundDays: 1,
      labId: labs[2].id,
    },
    {
      name: 'Powder Solubility Analysis',
      description: 'Solubility testing of powder samples in various solvents',
      category: 'Physical Characterization',
      subcategory: 'Functional tests for powders',
      price: 85.00,
      turnaroundDays: 2,
      labId: labs[3].id, // Wisconsin
    },
    {
      name: 'Powder Dispersibility Test',
      description: 'Dispersibility and wettability analysis of powder samples',
      category: 'Physical Characterization',
      subcategory: 'Functional tests for powders',
      price: 95.00,
      turnaroundDays: 2,
      labId: labs[3].id,
    },
    {
      name: 'Powder Rehydration Test',
      description: 'Rehydration properties and water absorption capacity',
      category: 'Physical Characterization',
      subcategory: 'Functional tests for powders',
      price: 80.00,
      turnaroundDays: 2,
      labId: labs[3].id,
    },
    {
      name: 'Powder Emulsification Test',
      description: 'Emulsifying capacity and stability of powder samples',
      category: 'Physical Characterization',
      subcategory: 'Functional tests for powders',
      price: 120.00,
      turnaroundDays: 3,
      labId: labs[3].id,
    },
    {
      name: 'Powder Foaming Test',
      description: 'Foaming capacity and foam stability analysis',
      category: 'Physical Characterization',
      subcategory: 'Functional tests for powders',
      price: 110.00,
      turnaroundDays: 3,
      labId: labs[4].id, // Purdue
    },
    {
      name: 'Powder Gelling Test',
      description: 'Gel formation and gel strength analysis',
      category: 'Physical Characterization',
      subcategory: 'Functional tests for powders',
      price: 100.00,
      turnaroundDays: 3,
      labId: labs[4].id,
    },
    {
      name: 'Powder Color Analysis',
      description: 'Color measurement using colorimeter (L*, a*, b* values)',
      category: 'Physical Characterization',
      subcategory: 'Functional tests for powders',
      price: 65.00,
      turnaroundDays: 1,
      labId: labs[4].id,
    },
    {
      name: 'Powder pH Analysis',
      description: 'pH measurement of powder solutions and suspensions',
      category: 'Physical Characterization',
      subcategory: 'Functional tests for powders',
      price: 50.00,
      turnaroundDays: 1,
      labId: labs[4].id,
    },
  ]

  // Insert all physical characterization tests
  await Promise.all(
    physicalTests.map(test => prisma.testDefinition.create({ data: test }))
  )
  console.log(`✅ Inserted ${physicalTests.length} Physical Characterization tests`)

  // Add a new professor specializing in physical characterization
  const newProfessor = {
    name: 'Dr. Michael Thompson',
    university: 'Purdue University',
    department: 'Food Science',
    specialization: 'Physical Properties, Rheology',
    contactEmail: 'michael.thompson@purdue.edu',
    bio: 'Expert in physical characterization of food materials, rheology, and powder technology.',
    imageUrl: '/images/prof-michael.jpg',
    officeHours: 'Mon, Wed 2-4',
    consultationPrice: 165.00,
    researchInterests: 'Food rheology, powder technology, physical properties, texture analysis, particle characterization.',
  }

  await prisma.professor.create({ data: newProfessor })
  console.log('✅ Added Physical Characterization specialist professor')

  console.log('🎉 Physical Characterization tests added successfully!')
  console.log(`📊 Total new tests: ${physicalTests.length}`)
  console.log(`👨‍🏫 New professor: Dr. Michael Thompson`)
}

seedPhysicalTests()
  .catch((err) => {
    console.error('❌ Seed failed!', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
