'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectTypeSelector, ProjectType } from '@/components/project-type-selector'
import { OthersForm } from '@/components/project-forms/others-form'
import { ProteinAnalysisForm } from '@/components/project-forms/protein-analysis-form'
import { ShelfLifeForm } from '@/components/project-forms/shelf-life-form'
import { SensoryStudyForm } from '@/components/project-forms/sensory-study-form'

export default function NewProjectPage() {
  const [selectedType, setSelectedType] = useState<ProjectType>('others')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (data: any) => {
    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('projectType', selectedType)
      formData.append('formData', JSON.stringify(data))
      
      // Add files to form data
      if (data.files && data.files.length > 0) {
        data.files.forEach((file: File, index: number) => {
          formData.append(`file_${index}`, file)
        })
      }

      const response = await fetch('/api/customised', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to submit project')
      }

      const result = await response.json()
      
      // Redirect to confirmation page
      router.push(`/customised/confirmation/${result.projectId}`)
    } catch (error) {
      console.error('Error submitting project:', error)
      alert('Failed to submit project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const renderForm = () => {
    switch (selectedType) {
      case 'protein-analysis':
        return <ProteinAnalysisForm onSubmit={handleSubmit} loading={loading} />
      case 'shelf-life':
        return <ShelfLifeForm onSubmit={handleSubmit} loading={loading} />
      case 'sensory-study':
        return <SensoryStudyForm onSubmit={handleSubmit} loading={loading} />
      case 'others':
      default:
        return <OthersForm onSubmit={handleSubmit} loading={loading} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
              Customised Test Submission
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let us help solve your food challenges. Submit your customised test requirements and connect with expert laboratories and professors.
            </p>
          </div>

          {/* Project Type Selector */}
          <ProjectTypeSelector
            selectedType={selectedType}
            onTypeChange={setSelectedType}
          />

          {/* Dynamic Form */}
          {renderForm()}
        </div>
      </div>
    </div>
  )
}
