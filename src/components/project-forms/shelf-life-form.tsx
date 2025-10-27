'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileUpload } from '@/components/file-upload'
import { shelfLifeStudySchema } from '@/lib/validations'

interface ShelfLifeFormProps {
  onSubmit: (data: any) => void
  loading?: boolean
}

const STABILITY_UNITS = [
  { value: 'days', label: 'Days' },
  { value: 'weeks', label: 'Weeks' },
  { value: 'months', label: 'Months' },
]

const TEMP_UNITS = [
  { value: 'celsius', label: '°C (Celsius)' },
  { value: 'fahrenheit', label: '°F (Fahrenheit)' },
]

export function ShelfLifeForm({ onSubmit, loading = false }: ShelfLifeFormProps) {
  const [formData, setFormData] = useState({
    product: '',
    stabilityPeriod: '',
    stabilityUnit: '',
    storageTemp: '',
    tempUnit: '',
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
      const validatedData = shelfLifeStudySchema.parse({
        ...formData,
        stabilityPeriod: parseFloat(formData.stabilityPeriod),
        storageTemp: parseFloat(formData.storageTemp),
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
        <CardTitle className="text-xl">Shelf Life Study Test</CardTitle>
        <p className="text-sm text-gray-600">
          Define your product stability testing requirements.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div className="space-y-2">
            <Label htmlFor="product">
              Product Name *
            </Label>
            <Input
              id="product"
              type="text"
              placeholder="Enter the name of the product to be tested"
              value={formData.product}
              onChange={(e) => handleInputChange('product', e.target.value)}
              className={errors.product ? 'border-red-500' : ''}
            />
            {errors.product && (
              <p className="text-sm text-red-600">{errors.product}</p>
            )}
          </div>

          {/* Stability Period */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stabilityPeriod">
                Desired Stability Period *
              </Label>
              <Input
                id="stabilityPeriod"
                type="number"
                placeholder="e.g., 30"
                value={formData.stabilityPeriod}
                onChange={(e) => handleInputChange('stabilityPeriod', e.target.value)}
                className={errors.stabilityPeriod ? 'border-red-500' : ''}
                min="1"
                step="1"
              />
              {errors.stabilityPeriod && (
                <p className="text-sm text-red-600">{errors.stabilityPeriod}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="stabilityUnit">
                Time Unit *
              </Label>
              <Select
                value={formData.stabilityUnit}
                onValueChange={(value) => handleInputChange('stabilityUnit', value)}
              >
                <SelectTrigger className={errors.stabilityUnit ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {STABILITY_UNITS.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.stabilityUnit && (
                <p className="text-sm text-red-600">{errors.stabilityUnit}</p>
              )}
            </div>
          </div>

          {/* Storage Temperature */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storageTemp">
                Storage Temperature *
              </Label>
              <Input
                id="storageTemp"
                type="number"
                placeholder="e.g., 25"
                value={formData.storageTemp}
                onChange={(e) => handleInputChange('storageTemp', e.target.value)}
                className={errors.storageTemp ? 'border-red-500' : ''}
                step="0.1"
              />
              {errors.storageTemp && (
                <p className="text-sm text-red-600">{errors.storageTemp}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tempUnit">
                Temperature Unit *
              </Label>
              <Select
                value={formData.tempUnit}
                onValueChange={(value) => handleInputChange('tempUnit', value)}
              >
                <SelectTrigger className={errors.tempUnit ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {TEMP_UNITS.map((unit) => (
                    <SelectItem key={unit.value} value={unit.value}>
                      {unit.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.tempUnit && (
                <p className="text-sm text-red-600">{errors.tempUnit}</p>
              )}
            </div>
          </div>

          {/* Detailed Requirements */}
          <div className="space-y-2">
            <Label htmlFor="detailedRequirements">
              Detailed Requirements *
            </Label>
            <Textarea
              id="detailedRequirements"
              placeholder="Describe your shelf life study requirements in detail. Include testing parameters, quality attributes to monitor, sampling schedule, acceptance criteria, and any specific standards or regulations..."
              value={formData.detailedRequirements}
              onChange={(e) => handleInputChange('detailedRequirements', e.target.value)}
              className={errors.detailedRequirements ? 'border-red-500' : ''}
              rows={6}
            />
            {errors.detailedRequirements && (
              <p className="text-sm text-red-600">{errors.detailedRequirements}</p>
            )}
            <p className="text-xs text-gray-500">
              Minimum 20 characters. Include specific testing parameters and quality attributes to monitor.
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
              Upload product specifications, previous stability data, or relevant documentation.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Submitting Project...' : 'Submit Shelf Life Study Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
