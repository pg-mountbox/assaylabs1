import { config } from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Load environment variables
config({ path: '.env.local' })

const prisma = new PrismaClient()

async function seedComprehensive() {
  console.log('🌱 Seeding comprehensive test database...')

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

  // Wet Chemistry Tests
  const wetChemistryTests = [
    {
      name: 'Protein Content Analysis',
      description: 'Quantitative protein analysis using Kjeldahl method',
      category: 'Wet Chemistry',
      subcategory: 'Protein',
      price: 75.00,
      turnaroundDays: 2,
      labId: labs[0].id,
    },
    {
      name: 'Fat Content Analysis',
      description: 'Total fat content determination using Soxhlet extraction',
      category: 'Wet Chemistry',
      subcategory: 'Fat',
      price: 85.00,
      turnaroundDays: 3,
      labId: labs[0].id,
    },
    {
      name: 'Moisture Content Analysis',
      description: 'Moisture and total solids determination using oven drying method',
      category: 'Wet Chemistry',
      subcategory: 'Moisture/Solids',
      price: 60.00,
      turnaroundDays: 2,
      labId: labs[0].id,
    },
    {
      name: 'Fiber Content Analysis',
      description: 'Crude fiber determination using acid and alkaline digestion',
      category: 'Wet Chemistry',
      subcategory: 'Fiber',
      price: 95.00,
      turnaroundDays: 4,
      labId: labs[0].id,
    },
    {
      name: 'Ash Content Analysis',
      description: 'Total ash content determination using muffle furnace',
      category: 'Wet Chemistry',
      subcategory: 'Ash content',
      price: 55.00,
      turnaroundDays: 2,
      labId: labs[0].id,
    },
    {
      name: 'Mineral Analysis Panel',
      description: 'Comprehensive analysis of major and trace minerals (Ca, Fe, Zn, Mg, etc.)',
      category: 'Wet Chemistry',
      subcategory: 'Mineral analysis',
      price: 150.00,
      turnaroundDays: 5,
      labId: labs[1].id,
    },
    {
      name: 'Non-Protein Nitrogen Analysis',
      description: 'Determination of non-protein nitrogen content in food products',
      category: 'Wet Chemistry',
      subcategory: 'Non Protein Nitrogen',
      price: 80.00,
      turnaroundDays: 3,
      labId: labs[1].id,
    },
    {
      name: 'Casein Content Analysis',
      description: 'Quantitative casein determination in dairy products',
      category: 'Wet Chemistry',
      subcategory: 'Casein',
      price: 90.00,
      turnaroundDays: 3,
      labId: labs[1].id,
    },
    {
      name: 'Lactose Content Analysis',
      description: 'Lactose quantification using enzymatic methods',
      category: 'Wet Chemistry',
      subcategory: 'Lactose content',
      price: 70.00,
      turnaroundDays: 2,
      labId: labs[1].id,
    },
    {
      name: 'Nitrogen Content Analysis',
      description: 'Total nitrogen determination using Kjeldahl method',
      category: 'Wet Chemistry',
      subcategory: 'Nitrogen',
      price: 65.00,
      turnaroundDays: 2,
      labId: labs[1].id,
    },
    {
      name: 'Whey Protein Nitrogen Analysis',
      description: 'Whey protein nitrogen determination in dairy products',
      category: 'Wet Chemistry',
      subcategory: 'Whey protein Nitrogen',
      price: 85.00,
      turnaroundDays: 3,
      labId: labs[1].id,
    },
    {
      name: 'Intact Casein in Cheese Analysis',
      description: 'Intact casein content determination in cheese products',
      category: 'Wet Chemistry',
      subcategory: 'Intact casein in Cheese',
      price: 100.00,
      turnaroundDays: 4,
      labId: labs[1].id,
    },
    {
      name: 'Salt Content Analysis',
      description: 'Sodium chloride content determination using titration',
      category: 'Wet Chemistry',
      subcategory: 'Salt content',
      price: 50.00,
      turnaroundDays: 1,
      labId: labs[2].id,
    },
    {
      name: 'Vitamin C Analysis',
      description: 'Ascorbic acid content determination using HPLC',
      category: 'Wet Chemistry',
      subcategory: 'Vitamin Tests',
      price: 100.00,
      turnaroundDays: 3,
      labId: labs[2].id,
    },
    {
      name: 'Vitamin B Complex Analysis',
      description: 'Comprehensive analysis of B-vitamins (B1, B2, B3, B6, B12)',
      category: 'Wet Chemistry',
      subcategory: 'Vitamin Tests',
      price: 200.00,
      turnaroundDays: 5,
      labId: labs[2].id,
    },
    {
      name: 'Vitamin D Analysis',
      description: 'Vitamin D2 and D3 content determination using LC-MS/MS',
      category: 'Wet Chemistry',
      subcategory: 'Vitamin Tests',
      price: 180.00,
      turnaroundDays: 4,
      labId: labs[2].id,
    },
    {
      name: 'Heavy Metals Panel',
      description: 'Analysis of lead, cadmium, mercury, and arsenic levels',
      category: 'Wet Chemistry',
      subcategory: 'Contaminants',
      price: 300.00,
      turnaroundDays: 7,
      labId: labs[2].id,
    },
    {
      name: 'Pesticide Residue Analysis',
      description: 'Multi-residue analysis for 200+ pesticides using GC-MS/MS',
      category: 'Wet Chemistry',
      subcategory: 'Pesticide residue analysis',
      price: 400.00,
      turnaroundDays: 10,
      labId: labs[2].id,
    },
    {
      name: 'Buffering Capacity Analysis',
      description: 'Titration curves for buffering capacity determination',
      category: 'Wet Chemistry',
      subcategory: 'Buffering curves',
      price: 120.00,
      turnaroundDays: 3,
      labId: labs[3].id,
    },
    {
      name: 'Titratable Acidity Analysis',
      description: 'Total acidity determination using pH titration',
      category: 'Wet Chemistry',
      subcategory: 'Acidity',
      price: 60.00,
      turnaroundDays: 1,
      labId: labs[3].id,
    },
    {
      name: 'Fatty Acid Profile Analysis',
      description: 'Comprehensive fatty acid composition using GC-FID',
      category: 'Wet Chemistry',
      subcategory: 'Fatty acid analysis',
      price: 180.00,
      turnaroundDays: 5,
      labId: labs[3].id,
    },
    {
      name: 'Amino Acid Analysis',
      description: 'Complete amino acid profile using HPLC with fluorescence detection',
      category: 'Wet Chemistry',
      subcategory: 'Amino acid analysis',
      price: 250.00,
      turnaroundDays: 6,
      labId: labs[3].id,
    },
    {
      name: 'Antibiotic Residue Testing',
      description: 'Screening for antibiotic residues using ELISA and LC-MS/MS',
      category: 'Wet Chemistry',
      subcategory: 'Antibiotic testing',
      price: 150.00,
      turnaroundDays: 4,
      labId: labs[3].id,
    },
    {
      name: 'Lactoferrin Analysis (ELISA)',
      description: 'Lactoferrin content determination using enzyme-linked immunosorbent assay',
      category: 'Wet Chemistry',
      subcategory: 'Lactoferrin analysis (ELISA)',
      price: 120.00,
      turnaroundDays: 3,
      labId: labs[3].id,
    },
  ]

  // Microbiology Tests
  const microbiologyTests = [
    {
      name: 'Aerobic Plate Count',
      description: 'Total aerobic bacterial count using standard plate count method',
      category: 'Microbiology',
      subcategory: 'Aerobic count',
      price: 80.00,
      turnaroundDays: 3,
      labId: labs[4].id,
    },
    {
      name: 'Total Coliforms Analysis',
      description: 'Coliform bacteria enumeration using membrane filtration',
      category: 'Microbiology',
      subcategory: 'Coliforms',
      price: 90.00,
      turnaroundDays: 3,
      labId: labs[4].id,
    },
    {
      name: 'E. coli Detection',
      description: 'Detection and quantification of E. coli in food samples',
      category: 'Microbiology',
      subcategory: 'Pathogen testing- Details',
      price: 150.00,
      turnaroundDays: 3,
      labId: labs[4].id,
    },
    {
      name: 'Salmonella Analysis',
      description: 'Comprehensive Salmonella detection and serotyping',
      category: 'Microbiology',
      subcategory: 'Pathogen testing- Details',
      price: 200.00,
      turnaroundDays: 5,
      labId: labs[4].id,
    },
    {
      name: 'Listeria monocytogenes Detection',
      description: 'Detection of Listeria monocytogenes using FDA BAM method',
      category: 'Microbiology',
      subcategory: 'Pathogen testing- Details',
      price: 180.00,
      turnaroundDays: 4,
      labId: labs[4].id,
    },
    {
      name: 'Staphylococcus aureus Analysis',
      description: 'Detection and enumeration of S. aureus using selective media',
      category: 'Microbiology',
      subcategory: 'Pathogen testing- Details',
      price: 120.00,
      turnaroundDays: 3,
      labId: labs[4].id,
    },
    {
      name: 'Campylobacter Detection',
      description: 'Detection of Campylobacter species using selective enrichment',
      category: 'Microbiology',
      subcategory: 'Pathogen testing- Details',
      price: 160.00,
      turnaroundDays: 4,
      labId: labs[4].id,
    },
    {
      name: 'Yeast and Mold Count',
      description: 'Enumeration of yeasts and molds using selective media',
      category: 'Microbiology',
      subcategory: 'Aerobic count',
      price: 100.00,
      turnaroundDays: 5,
      labId: labs[4].id,
    },
  ]

  // Combine all tests
  const allTests = [...wetChemistryTests, ...microbiologyTests]

  // Insert all tests
  await Promise.all(
    allTests.map(test => prisma.testDefinition.create({ data: test }))
  )
  console.log(`✅ Inserted ${allTests.length} tests`)

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
    {
      name: 'Dr. Carol White',
      university: 'Texas A&M University',
      department: 'Nutrition & Food Science',
      specialization: 'Food Processing, Shelf-Life',
      contactEmail: 'carol.white@tamu.edu',
      bio: 'Research on extending shelf-life and improving food quality through processing optimization.',
      imageUrl: '/images/prof-carol.jpg',
      officeHours: 'Mon, Fri 9-11',
      consultationPrice: 160.00,
      researchInterests: 'Minimal processing, food packaging, waste valorization, shelf-life extension.',
    },
    {
      name: 'Dr. David Kim',
      university: 'University of Wisconsin-Madison',
      department: 'Food Science',
      specialization: 'Analytical Chemistry, Contaminants',
      contactEmail: 'david.kim@wisc.edu',
      bio: 'Expert in analytical chemistry methods for food safety and quality assessment.',
      imageUrl: '/images/prof-david.jpg',
      officeHours: 'Wed, Fri 2-4',
      consultationPrice: 170.00,
      researchInterests: 'Heavy metals analysis, pesticide residues, analytical method development, food contaminants.',
    },
    {
      name: 'Dr. Emily Rodriguez',
      university: 'Purdue University',
      department: 'Food Science',
      specialization: 'Nutritional Analysis, Vitamins',
      contactEmail: 'emily.rodriguez@purdue.edu',
      bio: 'Specialist in nutritional composition analysis and vitamin content determination.',
      imageUrl: '/images/prof-emily.jpg',
      officeHours: 'Tue, Thu 10-12',
      consultationPrice: 155.00,
      researchInterests: 'Vitamin analysis, nutritional labeling, dietary assessment, micronutrient bioavailability.',
    },
  ]

  await Promise.all(
    professorData.map(prof => prisma.professor.create({ data: prof }))
  )
  console.log('✅ Inserted 5 professors')

  console.log('🎉 Comprehensive database seeded successfully!')
  console.log(`📊 Total tests: ${allTests.length}`)
  console.log(`🏢 Total labs: ${labs.length}`)
  console.log(`👨‍🏫 Total professors: ${professorData.length}`)
}

seedComprehensive()
  .catch((err) => {
    console.error('❌ Seed failed!', err)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
