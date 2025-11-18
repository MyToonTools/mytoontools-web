import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BorderBeam } from '@/components/ui/border-beam'
import { conversionConfigs } from '@/config/converters'
import type { ConversionType } from '@/types/converter'

interface ConverterEditorProps {
  activeType: ConversionType
  input: string
  output: string
  onInputChange: (value: string) => void
  error?: string
}

export function ConverterEditor({ 
  activeType, 
  input, 
  output, 
  onInputChange,
  error 
}: ConverterEditorProps) {
  const config = conversionConfigs[activeType]
  const InputIcon = config.icon

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <Card className="relative overflow-hidden">
        <BorderBeam />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <InputIcon size={20} />
            {config.inputLabel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              className="w-full h-96 p-4 border border-border rounded-lg font-mono text-sm bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder={config.inputPlaceholder}
              style={{
                lineHeight: '1.5',
                fontSize: '13px'
              }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Output Panel */}
      <Card className="relative overflow-hidden">
        <BorderBeam />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="w-5 h-5 rounded bg-linear-to-r from-primary to-accent flex items-center justify-center text-xs text-white font-bold">
              T
            </span>
            {config.outputLabel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              className={`w-full h-96 p-4 border border-border rounded-lg font-mono text-sm resize-none focus:outline-none ${
                error ? 'bg-red-50 text-red-700' : 'bg-muted/50'
              }`}
              placeholder={error || config.outputPlaceholder}
              style={{
                lineHeight: '1.5',
                fontSize: '13px'
              }}
            />
            {!output && !error && (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <InputIcon size={48} className="mx-auto mb-3 opacity-50" />
                  <p>Click "Convert to TOON" to see the result</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
