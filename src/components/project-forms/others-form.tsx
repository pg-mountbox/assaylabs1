'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/file-upload'
import { othersProjectSchema } from '@/lib/validations'

interface OthersFormProps {
  onSubmit: (data: any) => void
  loading?: boolean
}

export function OthersForm({ onSubmit, loading = false }: OthersFormProps) {
  const [formData, setFormData] = useState({
    briefDescription: '',
    detailedRequirements: '',
    previousAttempts: '',
  })
  const [files, setFiles] = useState<File[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const validatedData = othersProjectSchema.parse({
        ...formData,
        files,
      })
      onSubmit(validatedData)
    } catch (error: any) {
      const newErrors: Record<string, string> = {}
      error.errors?.forEach((err: any) => {
        if (err.path[0]) {
          newErrors[err.path[0]] = err.message
        }
      })
      setErrors(newErrors)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Test Details</CardTitle>
        <p className="text-sm text-gray-600">
          Tell us about your specialized test requirements and what you need help with.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Brief Description */}
          <div className="space-y-2">
            <Label htmlFor="briefDescription">
              Brief Description of Problem *
            </Label>
            <Textarea
              id="briefDescription"
              placeholder="Provide a brief overview of the problem you're trying to solve..."
              value={formData.briefDescription}
              onChange={(e) => handleInputChange('briefDescription', e.target.value)}
              className={errors.briefDescription ? 'border-red-500' : ''}
              rows={4}
            />
            {errors.briefDescription && (
              <p className="text-sm text-red-600">{errors.briefDescription}</p>
            )}
            <p className="text-xs text-gray-500">
              Minimum 20 characters
            </p>
          </div>

          {/* Detailed Requirements */}
          <div className="space-y-2">
            <Label htmlFor="detailedRequirements">
              Detailed Requirements *
            </Label>
            <Textarea
              id="detailedRequirements"
              placeholder="Describe in detail what you need help with, including specific goals, methodologies, timelines, and any constraints..."
              value={formData.detailedRequirements}
              onChange={(e) => handleInputChange('detailedRequirements', e.target.value)}
              className={errors.detailedRequirements ? 'border-red-500' : ''}
              rows={6}
            />
            {errors.detailedRequirements && (
              <p className="text-sm text-red-600">{errors.detailedRequirements}</p>
            )}
            <p className="text-xs text-gray-500">
              Minimum 20 characters
            </p>
          </div>

          {/* Previous Attempts */}
          <div className="space-y-2">
            <Label htmlFor="previousAttempts">
              Previous Attempts and Findings
            </Label>
            <Textarea
              id="previousAttempts"
              placeholder="Describe any previous attempts to solve this problem, including what you've tried, results obtained, and lessons learned..."
              value={formData.previousAttempts}
              onChange={(e) => handleInputChange('previousAttempts', e.target.value)}
              rows={4}
            />
            <p className="text-xs text-gray-500">
              Optional - helps us understand the context better
            </p>
          </div>

          {/* File Upload */}
          <div className="space-y-2">
            <Label>Supporting Documents</Label>
            <FileUpload
              files={files}
              onFilesChange={setFiles}
              maxFiles={10}
              maxSizePerFile={10}
              acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.mp4', '.mov']}
            />
            <p className="text-xs text-gray-500">
              Upload any relevant documents, images, or videos that might help us understand your project better.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Submitting Project...' : 'Submit Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
