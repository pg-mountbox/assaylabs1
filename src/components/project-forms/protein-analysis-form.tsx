'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { FileUpload } from '@/components/file-upload'
import { proteinAnalysisSchema } from '@/lib/validations'

interface ProteinAnalysisFormProps {
  onSubmit: (data: any) => void
  loading?: boolean
}

const PRODUCT_TYPES = [
  'Beverages',
  'Dairy Products',
  'Meat & Poultry',
  'Bakery Products',
  'Snack Foods',
  'Cereal Products',
  'Sauces & Condiments',
  'Frozen Foods',
  'Supplements',
  'Other',
]

export function ProteinAnalysisForm({ onSubmit, loading = false }: ProteinAnalysisFormProps) {
  const [formData, setFormData] = useState({
    productType: '',
    formFactor: '',
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
      const validatedData = proteinAnalysisSchema.parse({
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
        <CardTitle className="text-xl">Protein Analysis Test</CardTitle>
        <p className="text-sm text-gray-600">
          Provide details about your protein analysis requirements.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Type */}
          <div className="space-y-2">
            <Label htmlFor="productType">
              Product Type *
            </Label>
            <Select
              value={formData.productType}
              onValueChange={(value) => handleInputChange('productType', value)}
            >
              <SelectTrigger className={errors.productType ? 'border-red-500' : ''}>
                <SelectValue placeholder="Select product type" />
              </SelectTrigger>
              <SelectContent>
                {PRODUCT_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.productType && (
              <p className="text-sm text-red-600">{errors.productType}</p>
            )}
          </div>

          {/* Form Factor */}
          <div className="space-y-3">
            <Label>Form Factor *</Label>
            <RadioGroup
              value={formData.formFactor}
              onValueChange={(value) => handleInputChange('formFactor', value)}
              className={errors.formFactor ? 'border-red-500' : ''}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Solid" id="solid" />
                <Label htmlFor="solid">Solid</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Suspension" id="suspension" />
                <Label htmlFor="suspension">Suspension</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Liquid" id="liquid" />
                <Label htmlFor="liquid">Liquid</Label>
              </div>
            </RadioGroup>
            {errors.formFactor && (
              <p className="text-sm text-red-600">{errors.formFactor}</p>
            )}
          </div>

          {/* Detailed Requirements */}
          <div className="space-y-2">
            <Label htmlFor="detailedRequirements">
              Detailed Requirements *
            </Label>
            <Textarea
              id="detailedRequirements"
              placeholder="Describe your protein analysis needs in detail. Include specific parameters, methods, standards, sample size, timeline, and any special requirements..."
              value={formData.detailedRequirements}
              onChange={(e) => handleInputChange('detailedRequirements', e.target.value)}
              className={errors.detailedRequirements ? 'border-red-500' : ''}
              rows={6}
            />
            {errors.detailedRequirements && (
              <p className="text-sm text-red-600">{errors.detailedRequirements}</p>
            )}
            <p className="text-xs text-gray-500">
              Minimum 20 characters. Include specific analysis parameters, methods, and requirements.
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
              Upload product specifications, previous test results, or any relevant documentation.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Submitting Project...' : 'Submit Protein Analysis Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
