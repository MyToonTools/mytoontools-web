import { conversionConfigs } from '@/config/converters'
import type { ConversionType } from '@/types/converter'
import { Lightbulb } from 'lucide-react'

interface ConverterTipsProps {
  activeType: ConversionType
}

export function ConverterTips({ activeType }: ConverterTipsProps) {
  const config = conversionConfigs[activeType]

  return (
    <div className="mt-8 p-6 bg-accent/20 rounded-lg border border-accent/30">
      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Lightbulb size={20} className="text-accent" />
        Pro Tips for {config.name}
      </h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {config.tips.map((tip, index) => (
          <li key={index}>• {tip}</li>
        ))}
      </ul>
    </div>
  )
}
