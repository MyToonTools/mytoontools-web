import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { conversionConfigs } from '@/config/converters'
import type { ConversionType } from '@/types/converter'

interface ConverterSelectorProps {
  activeType: ConversionType
  onTypeChange: (type: ConversionType) => void
}

export function ConverterSelector({ activeType, onTypeChange }: ConverterSelectorProps) {
  const configs = Object.values(conversionConfigs)

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-center mb-4">Choose Conversion Type</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {configs.map((config) => {
          const Icon = config.icon
          const isActive = config.id === activeType
          
          return (
            <Card 
              key={config.id}
              className={`relative cursor-pointer transition-all duration-200 hover:border-primary/50 ${
                isActive ? 'border-primary bg-primary/5' : ''
              }`}
              onClick={() => onTypeChange(config.id)}
            >
              <CardContent className="p-4 text-center">
                <div className={`mx-auto mb-3 w-10 h-10 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  <Icon size={20} />
                </div>
                <h4 className="font-medium text-sm mb-1">{config.name}</h4>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {config.description}
                </p>
                {isActive && (
                  <Badge variant="default" className="text-xs">
                    Active
                  </Badge>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
