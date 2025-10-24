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
