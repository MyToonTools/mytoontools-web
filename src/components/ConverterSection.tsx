import { useState } from 'react'
import { ConverterSelector } from './ConverterSelector'
import { ConverterControls } from './ConverterControls'
import { ConverterStats } from './ConverterStats'
import { ConverterEditor } from './ConverterEditor'
import { ConverterTips } from './ConverterTips'
import { ConversionService } from '@/services/conversionService'
import { conversionConfigs } from '@/config/converters'
import type { ConversionType, ConverterState } from '@/types/converter'

export function ConverterSection() {
  const [state, setState] = useState<ConverterState>({
    activeType: 'json-to-toon',
    input: conversionConfigs['json-to-toon'].exampleData,
    output: '',
    inputTokens: 0,
    outputTokens: 0,
    isConverting: false,
    copied: false
  })

  const handleTypeChange = (type: ConversionType) => {
    const config = conversionConfigs[type]
    setState({
      activeType: type,
      input: config.exampleData,
      output: '',
      inputTokens: 0,
      outputTokens: 0,
      isConverting: false,
      copied: false,
      error: undefined
    })
  }

  const handleInputChange = (input: string) => {
    setState(prev => ({ 
      ...prev, 
      input, 
      output: '',
      inputTokens: 0,
      outputTokens: 0,
      error: undefined
    }))
  }

  const handleConvert = async () => {
    if (!state.input.trim()) return
    
    setState(prev => ({ ...prev, isConverting: true, error: undefined }))
    
    try {
      const result = await ConversionService.convert(state.activeType, state.input)
      
      setState(prev => ({
        ...prev,
        output: result.success ? result.output : '',
        inputTokens: result.inputTokens,
        outputTokens: result.outputTokens,
        error: result.error,
        isConverting: false
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        output: '',
        inputTokens: 0,
        outputTokens: 0,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        isConverting: false
      }))
    }
  }

  const handleReset = () => {
    const config = conversionConfigs[state.activeType]
    setState(prev => ({
      ...prev,
      input: config.exampleData,
      output: '',
      inputTokens: 0,
      outputTokens: 0,
      copied: false,
      error: undefined
    }))
  }

  const handleCopy = async () => {
    if (state.output) {
      await navigator.clipboard.writeText(state.output)
      setState(prev => ({ ...prev, copied: true }))
      setTimeout(() => {
        setState(prev => ({ ...prev, copied: false }))
      }, 2000)
    }
  }

  const handleDownload = () => {
    if (state.output) {
      const config = conversionConfigs[state.activeType]
      const blob = new Blob([state.output], { type: config.mimeType })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `converted.${config.fileExtension}`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  return (
    <section id="converter" className="py-24 bg-linear-to-b from-background to-accent/5" aria-labelledby="converter-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h2 id="converter-heading" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Try it Live
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            See the power of TOON format in action. Convert your data from multiple formats and watch the token savings.
          </p>
        </header>

        <ConverterSelector 
          activeType={state.activeType}
          onTypeChange={handleTypeChange}
        />

        <ConverterControls
          activeType={state.activeType}
          output={state.output}
          copied={state.copied}
          isConverting={state.isConverting}
          onConvert={handleConvert}
          onReset={handleReset}
          onCopy={handleCopy}
          onDownload={handleDownload}
        />

        <ConverterStats
          activeType={state.activeType}
          inputTokens={state.inputTokens}
          outputTokens={state.outputTokens}
        />

        <ConverterEditor
          activeType={state.activeType}
          input={state.input}
          output={state.output}
          onInputChange={handleInputChange}
          error={state.error}
        />

        <ConverterTips activeType={state.activeType} />
      </div>
    </section>
  )
}
