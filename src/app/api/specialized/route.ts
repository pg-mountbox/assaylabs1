import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { 
  proteinAnalysisSchema, 
  shelfLifeStudySchema, 
  sensoryStudySchema, 
  othersProjectSchema 
} from '@/lib/validations'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    
    let projectType: string
    let parsedFormData: any
    
    if (contentType?.includes('multipart/form-data')) {
      // Handle form data (with files)
      const formData = await request.formData()
      projectType = formData.get('projectType') as string
      const formDataJson = formData.get('formData') as string
      
      if (!projectType || !formDataJson) {
        return NextResponse.json(
          { message: 'Missing required fields' },
          { status: 400 }
        )
      }
      parsedFormData = JSON.parse(formDataJson)
    } else {
      // Handle JSON data
      const body = await request.json()
      projectType = body.projectType
      parsedFormData = body.formData || body
      
      if (!projectType) {
        return NextResponse.json(
          { message: 'Missing projectType field' },
          { status: 400 }
        )
      }
    }
    
    // Validate form data based on project type
    let validatedData
    switch (projectType) {
      case 'protein-analysis':
        validatedData = proteinAnalysisSchema.parse(parsedFormData)
        break
      case 'shelf-life':
        validatedData = shelfLifeStudySchema.parse(parsedFormData)
        break
      case 'sensory-study':
        validatedData = sensoryStudySchema.parse(parsedFormData)
        break
      case 'others':
        validatedData = othersProjectSchema.parse(parsedFormData)
        break
      default:
        return NextResponse.json(
          { message: 'Invalid project type' },
          { status: 400 }
        )
    }

    // For now, we'll create a simple project record
    // In a real implementation, you'd handle file uploads and store them
    const project = await prisma.projectEngagement.create({
      data: {
        title: `${projectType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Test`,
        description: validatedData.detailedRequirements,
        requirements: JSON.stringify(validatedData),
        status: 'pending',
        budget: null,
        bookingId: null,
        userId: null, // For demo purposes - in real app, get from session
        professorId: null,
      },
    })

    return NextResponse.json({
      message: 'Test submitted successfully',
      projectId: project.id,
    })
  } catch (error) {
    console.error('Error creating test:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { message: 'Validation error', errors: (error as any).errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { message: 'Failed to create test', error: String(error) },
      { status: 500 }
    )
  }
}
