import { z } from 'zod'

// Test search filters
export const testSearchSchema = z.object({
  category: z.string().optional(),
  subcategory: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  search: z.string().optional(),
})

// Professor search filters
export const professorSearchSchema = z.object({
  search: z.string().optional(),
  productType: z.enum([
    'Beverages',
    'High fat products',
    'cheese',
    'powders',
    'Dairy Ingredients',
    'fermented products',
    'Other'
  ]).optional(),
})

// Test booking
export const testBookingSchema = z.object({
  testId: z.number(),
  sampleDetails: z.string().min(1, 'Sample details are required'),
  scheduledDate: z.string().optional(),
})

// Consultation booking
export const consultationBookingSchema = z.object({
  professorId: z.number(),
  slotId: z.number(),
  topic: z.string().min(1, 'Topic is required'),
})

// Project engagement
export const projectEngagementSchema = z.object({
  professorId: z.number(),
  problemDescription: z.string().min(10, 'Problem description must be at least 10 characters'),
  durationWeeks: z.number().min(1).max(52),
  milestones: z.array(z.object({
    title: z.string(),
    description: z.string(),
    dueDate: z.string(),
  })).optional(),
})

// User profile update
export const userProfileSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  contactInfo: z.object({
    phone: z.string().optional(),
    address: z.string().optional(),
    website: z.string().url().optional().or(z.literal('')),
  }).optional(),
})

// Project form schemas
const baseProjectFields = {
  detailedRequirements: z.string().min(20, 'Detailed requirements must be at least 20 characters'),
  files: z.array(z.any()).optional(),
}

// Protein Analysis
export const proteinAnalysisSchema = z.object({
  productType: z.string().min(1, 'Product type is required'),
  formFactor: z.enum(['Solid', 'Suspension', 'Liquid'], {
    required_error: 'Form factor is required',
  }),
  ...baseProjectFields,
})

// Shelf Life Study
export const shelfLifeStudySchema = z.object({
  product: z.string().min(1, 'Product name is required'),
  stabilityPeriod: z.number().positive('Stability period must be positive'),
  stabilityUnit: z.enum(['days', 'weeks', 'months'], {
    required_error: 'Stability unit is required',
  }),
  storageTemp: z.number(),
  tempUnit: z.enum(['celsius', 'fahrenheit'], {
    required_error: 'Temperature unit is required',
  }),
  ...baseProjectFields,
})

// Sensory Study
export const sensoryStudySchema = z.object({
  nature: z.enum(['Qualitative', 'Quantitative'], {
    required_error: 'Nature is required',
  }),
  ...baseProjectFields,
})

// Others
export const othersProjectSchema = z.object({
  briefDescription: z.string().min(20, 'Brief description must be at least 20 characters'),
  detailedRequirements: z.string().min(20, 'Detailed requirements must be at least 20 characters'),
  previousAttempts: z.string().optional(),
  files: z.array(z.any()).optional(),
})
