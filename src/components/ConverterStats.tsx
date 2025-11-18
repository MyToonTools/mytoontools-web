import { Card, CardContent } from '@/components/ui/card'
import { BorderBeam } from '@/components/ui/border-beam'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ConversionService } from '@/services/conversionService'
import { conversionConfigs } from '@/config/converters'
import type { ConversionType } from '@/types/converter'

interface ConverterStatsProps {
  activeType: ConversionType
  inputTokens: number
  outputTokens: number
}

export function ConverterStats({ activeType, inputTokens, outputTokens }: ConverterStatsProps) {
  const config = conversionConfigs[activeType]
  const savings = ConversionService.getTokenSavings(inputTokens, outputTokens)

  if (inputTokens === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="relative overflow-hidden">
        <BorderBeam />
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-primary mb-1">
            <NumberTicker value={inputTokens} />
          </div>
          <div className="text-sm text-muted-foreground">
            {config.inputLabel.replace(' Input', '')} Tokens
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden">
        <BorderBeam />
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            <NumberTicker value={outputTokens} />
          </div>
          <div className="text-sm text-muted-foreground">TOON Tokens</div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden">
        <BorderBeam />
        <CardContent className="p-6 text-center">
          <div className="text-2xl font-bold text-accent mb-1">
            <NumberTicker value={savings} />%
          </div>
          <div className="text-sm text-muted-foreground">Token Savings</div>
        </CardContent>
      </Card>
    </div>
  )
}
