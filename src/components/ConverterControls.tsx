import { Button } from '@/components/ui/button'
import { conversionConfigs } from '@/config/converters'
import type { ConversionType } from '@/types/converter'
import { 
  RotateCcw,
  Copy,
  Download,
  CheckCircle,
  Upload,
  Loader2
} from 'lucide-react'

interface ConverterControlsProps {
  activeType: ConversionType
  output: string
  copied: boolean
  isConverting: boolean
  onConvert: () => void
  onReset: () => void
  onCopy: () => void
  onDownload: () => void
}

export function ConverterControls({
  activeType,
  output,
  copied,
  isConverting,
  onConvert,
  onReset,
  onCopy,
  onDownload
}: ConverterControlsProps) {
  const config = conversionConfigs[activeType]

  return (
    <div className="flex flex-wrap gap-4 mb-6 justify-center">
      <Button
        onClick={onConvert}
        disabled={isConverting}
        className="flex items-center gap-2 px-6 py-3"
      >
        {isConverting ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <RotateCcw size={18} />
        )}
        {isConverting ? 'Converting...' : `Convert to TOON`}
      </Button>
      
      <Button
        onClick={onReset}
        variant="outline"
        className="flex items-center gap-2 px-6 py-3"
      >
        <Upload size={18} />
        Reset Example
      </Button>
      
      {output && (
        <>
          <Button
            onClick={onCopy}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3"
          >
            {copied ? (
              <CheckCircle size={18} className="text-green-600" />
            ) : (
              <Copy size={18} />
            )}
            {copied ? 'Copied!' : 'Copy TOON'}
          </Button>
          
          <Button
            onClick={onDownload}
            variant="outline"
            className="flex items-center gap-2 px-6 py-3"
          >
            <Download size={18} />
            Download .{config.fileExtension}
          </Button>
        </>
      )}
    </div>
  )
}
