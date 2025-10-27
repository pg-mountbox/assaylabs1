'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Beaker, Clock, Eye, HelpCircle } from 'lucide-react'

export type ProjectType = 'protein-analysis' | 'shelf-life' | 'sensory-study' | 'others'

interface ProjectTypeSelectorProps {
  selectedType: ProjectType
  onTypeChange: (type: ProjectType) => void
}

const projectTypes = [
  {
    id: 'protein-analysis' as ProjectType,
    name: 'Protein Analysis',
    description: 'Analyze protein content and composition',
    icon: Beaker,
    color: 'bg-blue-500',
  },
  {
    id: 'shelf-life' as ProjectType,
    name: 'Shelf Life Study',
    description: 'Test product stability over time',
    icon: Clock,
    color: 'bg-green-500',
  },
  {
    id: 'sensory-study' as ProjectType,
    name: 'Sensory Study',
    description: 'Evaluate taste, texture, and appearance',
    icon: Eye,
    color: 'bg-purple-500',
  },
  {
    id: 'others' as ProjectType,
    name: 'Others',
    description: 'Custom specialized test',
    icon: HelpCircle,
    color: 'bg-gray-500',
  },
]

export function ProjectTypeSelector({ selectedType, onTypeChange }: ProjectTypeSelectorProps) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Choose Your Test Type
            </h3>
            <p className="text-sm text-gray-600">
              Select the type of specialized test you&apos;d like to submit
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {projectTypes.map((type) => {
              const Icon = type.icon
              const isSelected = selectedType === type.id
              
              return (
                <Button
                  key={type.id}
                  variant={isSelected ? 'default' : 'outline'}
                  className={`h-auto p-4 justify-start ${
                    isSelected
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => onTypeChange(type.id)}
                >
                  <div className="flex items-start space-x-3 w-full">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-white/20' : type.color
                    }`}>
                      <Icon className={`h-5 w-5 ${
                        isSelected ? 'text-white' : 'text-white'
                      }`} />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium">{type.name}</div>
                      <div className={`text-xs ${
                        isSelected ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {type.description}
                      </div>
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
