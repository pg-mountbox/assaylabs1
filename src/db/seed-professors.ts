import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const prisma = new PrismaClient()

const professors = [
  {
    name: 'Dr. Sarah Chen',
    university: 'MIT',
    department: 'Food Science',
    specialization: 'Food Chemistry',
    contactEmail: 'sarah.chen@mit.edu',
    bio: 'Leading expert in food chemistry with over 15 years of experience in analyzing food composition and nutritional content. Specializes in protein analysis and food safety testing.',
    labName: 'MIT Food Analysis Lab',
    consultationPrice: 200,
    researchInterests: 'Protein analysis, food safety, nutritional composition, food processing',
    productTypes: ['Beverages', 'High fat products', 'powders'],
  },
  {
    name: 'Dr. Michael Rodriguez',
    university: 'Stanford University',
    department: 'Microbiology',
    specialization: 'Food Microbiology',
    contactEmail: 'm.rodriguez@stanford.edu',
    bio: 'Microbiology professor specializing in food safety and fermentation processes. Expert in pathogen detection and beneficial bacteria research.',
    labName: 'Stanford Food Microbiology Lab',
    consultationPrice: 180,
    researchInterests: 'Food safety, fermentation, probiotics, pathogen detection',
    productTypes: ['fermented products', 'Dairy Ingredients', 'cheese'],
  },
  {
    name: 'Dr. Emily Watson',
    university: 'UC Davis',
    department: 'Nutrition',
    specialization: 'Nutritional Analysis',
    contactEmail: 'e.watson@ucdavis.edu',
    bio: 'Nutritional scientist with expertise in dietary assessment and food fortification. Focuses on improving nutritional quality of processed foods.',
    labName: 'UC Davis Nutrition Lab',
    consultationPrice: 150,
    researchInterests: 'Nutritional analysis, food fortification, dietary assessment',
    productTypes: ['Beverages', 'powders', 'Other'],
  },
  {
    name: 'Dr. James Thompson',
    university: 'Cornell University',
    department: 'Food Science',
    specialization: 'Dairy Science',
    contactEmail: 'j.thompson@cornell.edu',
    bio: 'Dairy science expert with extensive knowledge of milk processing, cheese making, and dairy product quality control.',
    labName: 'Cornell Dairy Research Center',
    consultationPrice: 175,
    researchInterests: 'Dairy processing, cheese making, milk quality, dairy microbiology',
    productTypes: ['cheese', 'Dairy Ingredients', 'fermented products'],
  },
  {
    name: 'Dr. Lisa Park',
    university: 'University of Wisconsin-Madison',
    department: 'Food Engineering',
    specialization: 'Food Processing',
    contactEmail: 'l.park@wisc.edu',
    bio: 'Food engineering professor specializing in process optimization and quality control in food manufacturing.',
    labName: 'UW Food Processing Lab',
    consultationPrice: 160,
    researchInterests: 'Process optimization, quality control, food manufacturing, thermal processing',
    productTypes: ['High fat products', 'powders', 'Beverages'],
  },
  {
    name: 'Dr. Robert Kim',
    university: 'University of Illinois',
    department: 'Food Science',
    specialization: 'Food Safety',
    contactEmail: 'r.kim@illinois.edu',
    bio: 'Food safety expert with focus on HACCP implementation and foodborne illness prevention. Consultant to major food companies.',
    labName: 'UI Food Safety Lab',
    consultationPrice: 190,
    researchInterests: 'Food safety, HACCP, foodborne pathogens, risk assessment',
    productTypes: ['cheese', 'fermented products', 'Other'],
  },
  {
    name: 'Dr. Maria Gonzalez',
    university: 'Texas A&M University',
    department: 'Food Science',
    specialization: 'Sensory Analysis',
    contactEmail: 'm.gonzalez@tamu.edu',
    bio: 'Sensory scientist specializing in consumer testing and product development. Expert in taste, texture, and aroma analysis.',
    labName: 'TAMU Sensory Lab',
    consultationPrice: 140,
    researchInterests: 'Sensory analysis, consumer testing, product development, flavor chemistry',
    productTypes: ['Beverages', 'High fat products', 'cheese'],
  },
  {
    name: 'Dr. David Lee',
    university: 'University of Minnesota',
    department: 'Food Science',
    specialization: 'Food Packaging',
    contactEmail: 'd.lee@umn.edu',
    bio: 'Packaging expert with focus on food preservation and shelf-life extension. Specializes in sustainable packaging solutions.',
    labName: 'UMN Packaging Lab',
    consultationPrice: 155,
    researchInterests: 'Food packaging, shelf-life, preservation, sustainable materials',
    productTypes: ['powders', 'Dairy Ingredients', 'Other'],
  },
  {
    name: 'Dr. Jennifer Brown',
    university: 'Purdue University',
    department: 'Food Science',
    specialization: 'Food Chemistry',
    contactEmail: 'j.brown@purdue.edu',
    bio: 'Food chemist with expertise in lipid analysis and oxidative stability. Focuses on healthy fats and oil processing.',
    labName: 'Purdue Lipid Lab',
    consultationPrice: 170,
    researchInterests: 'Lipid analysis, oxidative stability, healthy fats, oil processing',
    productTypes: ['High fat products', 'Dairy Ingredients', 'powders'],
  },
  {
    name: 'Dr. Ahmed Hassan',
    university: 'University of California, Berkeley',
    department: 'Food Science',
    specialization: 'Food Biotechnology',
    contactEmail: 'a.hassan@berkeley.edu',
    bio: 'Biotechnology expert specializing in enzyme applications and fermentation technology. Focuses on sustainable food production.',
    labName: 'UCB Food Biotech Lab',
    consultationPrice: 185,
    researchInterests: 'Food biotechnology, enzyme technology, fermentation, sustainable production',
    productTypes: ['fermented products', 'Beverages', 'Other'],
  },
]

async function createAvailabilitySlots(professorId: number) {
  const slots = []
  const now = new Date()
  
  // Create 5-7 availability slots over the next 2 weeks
  const slotCount = Math.floor(Math.random() * 3) + 5 // 5-7 slots
  
  for (let i = 0; i < slotCount; i++) {
    // Random day in the next 14 days
    const daysAhead = Math.floor(Math.random() * 14) + 1
    const slotDate = new Date(now)
    slotDate.setDate(now.getDate() + daysAhead)
    
    // Random hour between 9 AM and 5 PM
    const hour = Math.floor(Math.random() * 8) + 9
    slotDate.setHours(hour, 0, 0, 0)
    
    // Random duration: 20, 30, or 40 minutes
    const durations = [20, 30, 40]
    const duration = durations[Math.floor(Math.random() * durations.length)]
    
    const endTime = new Date(slotDate)
    endTime.setMinutes(slotDate.getMinutes() + duration)
    
    slots.push({
      professorId,
      startTime: slotDate,
      endTime,
      durationMinutes: duration,
      isBooked: false,
    })
  }
  
  return slots
}

async function main() {
  console.log('🌱 Seeding professors data...')
  
  try {
    // Clear existing data
    await prisma.professorAvailability.deleteMany()
    await prisma.professor.deleteMany()
    
    console.log('Cleared existing professor data')
    
    // Create professors
    for (const professorData of professors) {
      const professor = await prisma.professor.create({
        data: professorData,
      })
      
      console.log(`Created professor: ${professor.name}`)
      
      // Create availability slots
      const slots = await createAvailabilitySlots(professor.id)
      await prisma.professorAvailability.createMany({
        data: slots,
      })
      
      console.log(`Created ${slots.length} availability slots for ${professor.name}`)
    }
    
    console.log('✅ Successfully seeded professors data!')
    console.log(`Created ${professors.length} professors with availability slots`)
    
  } catch (error) {
    console.error('❌ Error seeding professors data:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
