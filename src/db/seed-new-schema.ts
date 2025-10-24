import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load environment variables
config({ path: '.env.local' })

const prisma = new PrismaClient()

async function seedNewSchema() {
  console.log('🌱 Seeding new schema with test definitions and lab tests...')

  // Insert labs
  const labData = [
    {
      name: 'Food Safety Laboratory',
      university: 'UC Davis',
      location: 'Davis, CA',
      contactEmail: 'foodsafety@ucdavis.edu',
      status: 'active',
      description: 'Specialized in food safety and quality analysis with comprehensive testing capabilities.',
      imageUrl: '/images/lab-ucdavis.jpg',
      website: 'https://foodscience.ucdavis.edu',
    },
    {
      name: 'Nutritional Analysis Lab',
      university: 'Cornell University',
      location: 'Ithaca, NY',
      contactEmail: 'nutrition@cornell.edu',
      status: 'active',
      description: 'Advanced research in food processing and innovation with state-of-the-art equipment.',
      imageUrl: '/images/lab-cornell.jpg',
      website: 'https://foodscience.cornell.edu',
    },
    {
      name: 'Microbiology Research Center',
      university: 'Texas A&M',
      location: 'College Station, TX',
      contactEmail: 'microbiology@tamu.edu',
      status: 'active',
      description: 'Focus on agricultural and food product development with comprehensive microbiological testing.',
      imageUrl: '/images/lab-tamu.jpg',
      website: 'https://agrilife.tamu.edu',
    },
    {
      name: 'Food Chemistry Lab',
      university: 'University of Wisconsin-Madison',
      location: 'Madison, WI',
      contactEmail: 'foodchem@wisc.edu',
      status: 'active',
      description: 'Specialized in wet chemistry analysis and nutritional composition testing.',
      imageUrl: '/images/lab-wisconsin.jpg',
      website: 'https://foodscience.wisc.edu',
    },
    {
      name: 'Analytical Services Lab',
      university: 'Purdue University',
      location: 'West Lafayette, IN',
      contactEmail: 'analytical@purdue.edu',
      status: 'active',
      description: 'Comprehensive analytical testing services for food and agricultural products.',
      imageUrl: '/images/lab-purdue.jpg',
      website: 'https://ag.purdue.edu',
    },
  ]

  const labs = await Promise.all(
    labData.map(lab => prisma.lab.create({ data: lab }))
  )
  console.log('✅ Inserted 5 labs')

  // Create test definitions
  const testDefinitions = [
    // Wet Chemistry Tests
    {
      name: 'Protein Content Analysis',
      description: 'Quantitative protein analysis using Kjeldahl method',
      category: 'Wet Chemistry',
      subcategory: 'Protein',
    },
    {
      name: 'Fat Content Analysis',
      description: 'Total fat content determination using Soxhlet extraction',
      category: 'Wet Chemistry',
      subcategory: 'Fat',
    },
    {
      name: 'Moisture Content Analysis',
      description: 'Moisture and total solids determination using oven drying method',
      category: 'Wet Chemistry',
      subcategory: 'Moisture/Solids',
    },
    {
      name: 'E. coli Detection',
      description: 'Detection and quantification of E. coli in food samples',
      category: 'Microbiology',
      subcategory: 'Pathogen testing- Details',
    },
    {
      name: 'Salmonella Analysis',
      description: 'Comprehensive Salmonella detection and serotyping',
      category: 'Microbiology',
      subcategory: 'Pathogen testing- Details',
    },
    {
      name: 'Rheological Analysis - Viscosity',
      description: 'Measurement of flow properties and viscosity using rotational rheometer',
      category: 'Physical Characterization',
      subcategory: 'Rheology',
    },
    {
      name: 'Particle Size Distribution - Laser Diffraction',
      description: 'Particle size analysis using laser diffraction technique',
      category: 'Physical Characterization',
      subcategory: 'Particle size',
    },
  ]

  const createdTestDefinitions = await Promise.all(
    testDefinitions.map(testDef => prisma.testDefinition.create({ data: testDef }))
  )
  console.log(`✅ Inserted ${createdTestDefinitions.length} test definitions`)

  // Create lab tests - same test can be offered by multiple labs at different prices
  const labTests = [
    // Protein Content Analysis - offered by multiple labs
    {
      testDefinitionId: createdTestDefinitions[0].id,
      labId: labs[0].id, // UC Davis
      price: 75.00,
      turnaroundDays: 2,
    },
    {
      testDefinitionId: createdTestDefinitions[0].id,
      labId: labs[1].id, // Cornell
      price: 85.00,
      turnaroundDays: 3,
    },
    {
      testDefinitionId: createdTestDefinitions[0].id,
      labId: labs[3].id, // Wisconsin
      price: 70.00,
      turnaroundDays: 2,
    },
    // Fat Content Analysis - offered by multiple labs
    {
      testDefinitionId: createdTestDefinitions[1].id,
      labId: labs[0].id, // UC Davis
      price: 85.00,
      turnaroundDays: 3,
    },
    {
      testDefinitionId: createdTestDefinitions[1].id,
      labId: labs[1].id, // Cornell
      price: 90.00,
      turnaroundDays: 4,
    },
    {
      testDefinitionId: createdTestDefinitions[1].id,
      labId: labs[3].id, // Wisconsin
      price: 80.00,
      turnaroundDays: 3,
    },
    // Moisture Content Analysis - offered by multiple labs
    {
      testDefinitionId: createdTestDefinitions[2].id,
      labId: labs[0].id, // UC Davis
      price: 60.00,
      turnaroundDays: 2,
    },
    {
      testDefinitionId: createdTestDefinitions[2].id,
      labId: labs[1].id, // Cornell
      price: 65.00,
      turnaroundDays: 2,
    },
    {
      testDefinitionId: createdTestDefinitions[2].id,
      labId: labs[2].id, // Texas A&M
      price: 55.00,
      turnaroundDays: 1,
    },
    // E. coli Detection - offered by multiple labs
    {
      testDefinitionId: createdTestDefinitions[3].id,
      labId: labs[2].id, // Texas A&M
      price: 150.00,
      turnaroundDays: 3,
    },
    {
      testDefinitionId: createdTestDefinitions[3].id,
      labId: labs[4].id, // Purdue
      price: 140.00,
      turnaroundDays: 3,
    },
    // Salmonella Analysis - offered by multiple labs
    {
      testDefinitionId: createdTestDefinitions[4].id,
      labId: labs[2].id, // Texas A&M
      price: 200.00,
      turnaroundDays: 5,
    },
    {
      testDefinitionId: createdTestDefinitions[4].id,
      labId: labs[4].id, // Purdue
      price: 180.00,
      turnaroundDays: 4,
    },
    // Rheological Analysis - offered by multiple labs
    {
      testDefinitionId: createdTestDefinitions[5].id,
      labId: labs[0].id, // UC Davis
      price: 120.00,
      turnaroundDays: 3,
    },
    {
      testDefinitionId: createdTestDefinitions[5].id,
      labId: labs[4].id, // Purdue
      price: 110.00,
      turnaroundDays: 3,
    },
    // Particle Size Distribution - offered by multiple labs
    {
      testDefinitionId: createdTestDefinitions[6].id,
      labId: labs[1].id, // Cornell
      price: 110.00,
      turnaroundDays: 2,
    },
    {
      testDefinitionId: createdTestDefinitions[6].id,
      labId: labs[4].id, // Purdue
      price: 100.00,
      turnaroundDays: 2,
    },
  ]

  await Promise.all(
    labTests.map(labTest => prisma.labTest.create({ data: labTest }))
  )
  console.log(`✅ Inserted ${labTests.length} lab tests`)

  // Insert professors
  const professorData = [
    {
      name: 'Dr. Alice Chen',
      university: 'UC Davis',
      department: 'Food Science',
      specialization: 'Food Safety, Microbiology',
      contactEmail: 'alice.chen@ucdavis.edu',
      bio: 'Expert in rapid detection methods for foodborne pathogens and microbiological safety.',
      imageUrl: '/images/prof-alice.jpg',
      officeHours: 'Mon, Wed 10-12',
      consultationPrice: 150.00,
      researchInterests: 'Food microbiology, pathogen control, novel preservation techniques, rapid detection methods.',
    },
    {
      name: 'Dr. Bob Johnson',
      university: 'Cornell University',
      department: 'Food Science',
      specialization: 'Food Chemistry, Product Development',
      contactEmail: 'bob.johnson@cornell.edu',
      bio: 'Focuses on ingredient functionality and new product formulation with expertise in wet chemistry.',
      imageUrl: '/images/prof-bob.jpg',
      officeHours: 'Tue, Thu 1-3',
      consultationPrice: 180.00,
      researchInterests: 'Food rheology, flavor chemistry, plant-based proteins, nutritional analysis.',
    },
  ]

  await Promise.all(
    professorData.map(prof => prisma.professor.create({ data: prof }))
  )
  console.log('✅ Inserted 2 professors')

  console.log('🎉 New schema seeded successfully!')
  console.log(`📊 Test definitions: ${createdTestDefinitions.length}`)
  console.log(`🏢 Labs: ${labs.length}`)
  console.log(`🔬 Lab tests: ${labTests.length}`)
  console.log(`👨‍🏫 Professors: ${professorData.length}`)
}

seedNewSchema()
  .catch((err) => {
    console.error('❌ Seed failed!', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
