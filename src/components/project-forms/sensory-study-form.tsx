'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FileUpload } from '@/components/file-upload'
import { sensoryStudySchema } from '@/lib/validations'

interface SensoryStudyFormProps {
  onSubmit: (data: any) => void
  loading?: boolean
}

export function SensoryStudyForm({ onSubmit, loading = false }: SensoryStudyFormProps) {
  const [formData, setFormData] = useState({
    nature: '',
    detailedRequirements: '',
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
      const validatedData = sensoryStudySchema.parse({
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
        <CardTitle className="text-xl">Sensory Study Project</CardTitle>
        <p className="text-sm text-gray-600">
          Define your sensory evaluation requirements.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nature Selection */}
          <div className="space-y-3">
            <Label>Study Nature *</Label>
            <RadioGroup
              value={formData.nature}
              onValueChange={(value) => handleInputChange('nature', value)}
              className={errors.nature ? 'border-red-500' : ''}
            >
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="Qualitative" id="qualitative" className="mt-1" />
                  <div className="space-y-1">
                    <Label htmlFor="qualitative" className="font-medium cursor-pointer">
                      Qualitative Study
                    </Label>
                    <p className="text-sm text-gray-600">
                      Descriptive analysis focusing on sensory attributes, flavors, textures, and appearance characteristics. 
                      Ideal for product development and quality control.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value="Quantitative" id="quantitative" className="mt-1" />
                  <div className="space-y-1">
                    <Label htmlFor="quantitative" className="font-medium cursor-pointer">
                      Quantitative Study
                    </Label>
                    <p className="text-sm text-gray-600">
                      Statistical analysis with numerical data, consumer preference studies, and comparative testing. 
                      Ideal for market research and product optimization.
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
            {errors.nature && (
              <p className="text-sm text-red-600">{errors.nature}</p>
            )}
          </div>

          {/* Detailed Requirements */}
          <div className="space-y-2">
            <Label htmlFor="detailedRequirements">
              Detailed Requirements *
            </Label>
            <Textarea
              id="detailedRequirements"
              placeholder="Describe your sensory study requirements in detail. Include specific attributes to evaluate, testing methodology, sample size, panel requirements, testing environment, timeline, and any specific standards or protocols..."
              value={formData.detailedRequirements}
              onChange={(e) => handleInputChange('detailedRequirements', e.target.value)}
              className={errors.detailedRequirements ? 'border-red-500' : ''}
              rows={6}
            />
            {errors.detailedRequirements && (
              <p className="text-sm text-red-600">{errors.detailedRequirements}</p>
            )}
            <p className="text-xs text-gray-500">
              Minimum 20 characters. Include specific sensory attributes, methodology, and testing requirements.
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
              Upload product samples information, previous sensory data, or relevant documentation.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Submitting Project...' : 'Submit Sensory Study Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
